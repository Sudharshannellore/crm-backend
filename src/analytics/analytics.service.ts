import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument, LeadSource } from '../leads/schemas/lead.schema';
import { Deal, DealDocument, DealStage } from '../deals/schemas/deal.schema';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const SOURCE_LABELS: Record<LeadSource, string> = {
  [LeadSource.WEBSITE]: 'Website',
  [LeadSource.REFERRAL]: 'Referral',
  [LeadSource.LINKEDIN]: 'LinkedIn',
  [LeadSource.COLD_OUTREACH]: 'Cold Outreach',
  [LeadSource.EVENT]: 'Events',
};

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Lead.name) private leadModel: Model<LeadDocument>,
    @InjectModel(Deal.name) private dealModel: Model<DealDocument>,
  ) {}

  async getRevenueByMonth() {
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

  async getLeadsBySource() {
    const results = await this.leadModel
      .aggregate([
        {
          $group: {
            _id: '$source',
            value: { $sum: 1 },
          },
        },
      ])
      .exec();

    const countsBySource = new Map<string, number>();
    for (const r of results) {
      countsBySource.set(r._id, r.value);
    }

    return Object.values(LeadSource).map((source) => ({
      name: SOURCE_LABELS[source] ?? source,
      value: countsBySource.get(source) ?? 0,
    }));
  }

  /**
   * Revenue forecast by month over the trailing 12 months. `actual` is realised
   * revenue from won deals; `forecast` is the probability-weighted value of all
   * deals (projected pipeline), both bucketed by close date (falling back to
   * created date). Returns [{ month, actual, forecast }].
   */
  async getForecast() {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const results = await this.dealModel
      .aggregate([
        { $addFields: { effectiveDate: { $ifNull: ['$closeDate', '$createdAt'] } } },
        { $match: { effectiveDate: { $gte: twelveMonthsAgo } } },
        {
          $group: {
            _id: {
              year: { $year: '$effectiveDate' },
              month: { $month: '$effectiveDate' },
            },
            actual: {
              $sum: {
                $cond: [{ $eq: ['$stage', DealStage.CLOSED_WON] }, '$value', 0],
              },
            },
            forecast: {
              $sum: {
                $multiply: ['$value', { $divide: [{ $ifNull: ['$probability', 0] }, 100] }],
              },
            },
          },
        },
      ])
      .exec();

    const map = new Map<string, { actual: number; forecast: number }>();
    for (const r of results) {
      map.set(`${r._id.year}-${r._id.month}`, {
        actual: r.actual ?? 0,
        forecast: Math.round(r.forecast ?? 0),
      });
    }

    const data: { month: string; actual: number; forecast: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const entry = map.get(`${d.getFullYear()}-${d.getMonth() + 1}`);
      data.push({
        month: MONTH_NAMES[d.getMonth()],
        actual: entry?.actual ?? 0,
        forecast: entry?.forecast ?? 0,
      });
    }
    return data;
  }

  /**
   * Deal segmentation by value tier. Returns [{ segment, value }] where value
   * is the count of deals in each size band.
   */
  async getSegments(): Promise<{ segment: string; value: number }[]> {
    const results = await this.dealModel
      .aggregate([
        {
          $bucket: {
            groupBy: '$value',
            boundaries: [0, 50000, 200000, 1000000, Number.MAX_SAFE_INTEGER],
            default: 'Unknown',
            output: { count: { $sum: 1 } },
          },
        },
      ])
      .exec();

    const labels: Record<string, string> = {
      '0': 'Small (< ₹50K)',
      '50000': 'Medium (₹50K–₹200K)',
      '200000': 'Large (₹200K–₹1M)',
      '1000000': 'Enterprise (> ₹1M)',
      Unknown: 'Unknown',
    };
    const order = ['0', '50000', '200000', '1000000'];
    const countsByBucket = new Map<string, number>();
    for (const r of results) {
      countsByBucket.set(String(r._id), r.count);
    }

    return order.map((key) => ({
      segment: labels[key],
      value: countsByBucket.get(key) ?? 0,
    }));
  }

  async getTeamPerformance() {
    const results = await this.dealModel
      .aggregate([
        {
          $group: {
            _id: '$owner',
            deals: { $sum: 1 },
            revenue: { $sum: '$value' },
          },
        },
        { $sort: { revenue: -1 } },
      ])
      .exec();

    return results.map((r) => ({
      name: r._id ?? 'Unassigned',
      deals: r.deals,
      revenue: r.revenue,
    }));
  }
}
