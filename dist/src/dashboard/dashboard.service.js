"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("../leads/schemas/lead.schema");
const deal_schema_1 = require("../deals/schemas/deal.schema");
const task_schema_1 = require("../tasks/schemas/task.schema");
const meeting_schema_1 = require("../meetings/schemas/meeting.schema");
const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
let DashboardService = class DashboardService {
    leadModel;
    dealModel;
    taskModel;
    meetingModel;
    constructor(leadModel, dealModel, taskModel, meetingModel) {
        this.leadModel = leadModel;
        this.dealModel = dealModel;
        this.taskModel = taskModel;
        this.meetingModel = meetingModel;
    }
    async getStats() {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(startOfToday);
        endOfToday.setDate(endOfToday.getDate() + 1);
        const sevenDaysOut = new Date(startOfToday);
        sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);
        const [totalLeads, dealAgg, tasksDueToday, tasksOverdue, upcomingMeetings] = await Promise.all([
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
                status: { $ne: task_schema_1.TaskStatus.COMPLETED },
            })
                .exec(),
            this.taskModel
                .countDocuments({
                dueDate: { $lt: startOfToday },
                status: { $ne: task_schema_1.TaskStatus.COMPLETED },
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
        const revenueMap = new Map();
        for (const r of results) {
            revenueMap.set(`${r._id.year}-${r._id.month}`, r.revenue);
        }
        const revenueData = [];
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
    async getConversionFunnel() {
        const proposalOrLater = [
            deal_schema_1.DealStage.PROPOSAL,
            deal_schema_1.DealStage.NEGOTIATION,
            deal_schema_1.DealStage.CLOSED_WON,
        ];
        const [totalLeads, qualifiedLeads, proposals, won] = await Promise.all([
            this.leadModel.countDocuments().exec(),
            this.leadModel.countDocuments({ status: lead_schema_1.LeadStatus.QUALIFIED }).exec(),
            this.dealModel.countDocuments({ stage: { $in: proposalOrLater } }).exec(),
            this.dealModel.countDocuments({ stage: deal_schema_1.DealStage.CLOSED_WON }).exec(),
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
            ...leads.map((lead) => ({
                type: 'lead',
                title: `${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
                timestamp: lead.updatedAt ?? lead.createdAt,
                id: lead._id.toString(),
            })),
            ...deals.map((deal) => ({
                type: 'deal',
                title: deal.title,
                timestamp: deal.updatedAt ?? deal.createdAt,
                id: deal._id.toString(),
            })),
            ...tasks.map((task) => ({
                type: 'task',
                title: task.title,
                timestamp: task.updatedAt ?? task.createdAt,
                id: task._id.toString(),
            })),
            ...meetings.map((meeting) => ({
                type: 'meeting',
                title: meeting.title,
                timestamp: meeting.updatedAt ?? meeting.createdAt,
                id: meeting._id.toString(),
            })),
        ];
        items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return items.slice(0, limit);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __param(1, (0, mongoose_1.InjectModel)(deal_schema_1.Deal.name)),
    __param(2, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __param(3, (0, mongoose_1.InjectModel)(meeting_schema_1.Meeting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map