import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument, LeadStatus } from '../leads/schemas/lead.schema';
import { Deal, DealDocument, DealStage } from '../deals/schemas/deal.schema';
import { Task, TaskDocument, TaskStatus } from '../tasks/schemas/task.schema';
import { Meeting, MeetingDocument } from '../meetings/schemas/meeting.schema';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Lead.name) private leadModel: Model<LeadDocument>,
    @InjectModel(Deal.name) private dealModel: Model<DealDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}

  async getStats() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);
    const sevenDaysOut = new Date(startOfToday);
    sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);

    const [totalLeads, dealAgg, tasksDueToday, tasksOverdue, upcomingMeetings] =
      await Promise.all([
        this.leadModel.countDocuments().exec(),
        this.dealModel
          .aggregate([
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalValue: { $sum: '$value' },
              },
            },
          ])
          .exec(),
        this.taskModel
          .countDocuments({
            dueDate: { $gte: startOfToday, $lt: endOfToday },
            status: { $ne: TaskStatus.COMPLETED },
          })
          .exec(),
        this.taskModel
          .countDocuments({
            dueDate: { $lt: startOfToday },
            status: { $ne: TaskStatus.COMPLETED },
          })
          .exec(),
        this.meetingModel
          .countDocuments({
            date: { $gte: startOfToday, $lte: sevenDaysOut },
          })
          .exec(),
      ]);

    const dealStats = dealAgg[0] ?? { count: 0, totalValue: 0 };

    return {
      totalLeads,
      totalDeals: dealStats.count,
      totalDealsValue: dealStats.totalValue,
      tasksDueToday,
      tasksOverdue,
      upcomingMeetings,
    };
  }

  async getRevenue() {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const results = await this.dealModel
      .aggregate([
        {
          $addFields: {
            effectiveDate: { $ifNull: ['$closeDate', '$createdAt'] },
          },
        },
        {
          $match: {
            effectiveDate: { $gte: twelveMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$effectiveDate' },
              month: { $month: '$effectiveDate' },
            },
            revenue: { $sum: '$value' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ])
      .exec();

    const revenueMap = new Map<string, number>();
    for (const r of results) {
      revenueMap.set(`${r._id.year}-${r._id.month}`, r.revenue);
    }

    const revenueData: { month: string; revenue: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      revenueData.push({
        month: MONTH_NAMES[d.getMonth()],
        revenue: revenueMap.get(key) ?? 0,
      });
    }

    return revenueData;
  }

  /**
   * Conversion funnel across the lead -> deal lifecycle. Derived from real
   * collections: total leads, qualified leads, deals that reached proposal or
   * later, and deals won. Returns [{ stage, count }].
   */
  async getConversionFunnel(): Promise<{ stage: string; count: number }[]> {
    const proposalOrLater = [
      DealStage.PROPOSAL,
      DealStage.NEGOTIATION,
      DealStage.CLOSED_WON,
    ];

    const [totalLeads, qualifiedLeads, proposals, won] = await Promise.all([
      this.leadModel.countDocuments().exec(),
      this.leadModel.countDocuments({ status: LeadStatus.QUALIFIED }).exec(),
      this.dealModel.countDocuments({ stage: { $in: proposalOrLater } }).exec(),
      this.dealModel.countDocuments({ stage: DealStage.CLOSED_WON }).exec(),
    ]);

    return [
      { stage: 'Leads', count: totalLeads },
      { stage: 'Qualified', count: qualifiedLeads },
      { stage: 'Proposal', count: proposals },
      { stage: 'Won', count: won },
    ];
  }

  async getActivity(limit = 10) {
    const [leads, deals, tasks, meetings] = await Promise.all([
      this.leadModel
        .find()
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('name company updatedAt createdAt')
        .exec(),
      this.dealModel
        .find()
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('title company updatedAt createdAt')
        .exec(),
      this.taskModel
        .find()
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('title updatedAt createdAt')
        .exec(),
      this.meetingModel
        .find()
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('title updatedAt createdAt')
        .exec(),
    ]);

    const items = [
      ...leads.map((lead: any) => ({
        type: 'lead',
        title: `${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        timestamp: lead.updatedAt ?? lead.createdAt,
        id: lead._id.toString(),
      })),
      ...deals.map((deal: any) => ({
        type: 'deal',
        title: deal.title,
        timestamp: deal.updatedAt ?? deal.createdAt,
        id: deal._id.toString(),
      })),
      ...tasks.map((task: any) => ({
        type: 'task',
        title: task.title,
        timestamp: task.updatedAt ?? task.createdAt,
        id: task._id.toString(),
      })),
      ...meetings.map((meeting: any) => ({
        type: 'meeting',
        title: meeting.title,
        timestamp: meeting.updatedAt ?? meeting.createdAt,
        id: meeting._id.toString(),
      })),
    ];

    items.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    return items.slice(0, limit);
  }
}
