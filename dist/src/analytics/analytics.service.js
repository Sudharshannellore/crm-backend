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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("../leads/schemas/lead.schema");
const deal_schema_1 = require("../deals/schemas/deal.schema");
const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const SOURCE_LABELS = {
    [lead_schema_1.LeadSource.WEBSITE]: 'Website',
    [lead_schema_1.LeadSource.REFERRAL]: 'Referral',
    [lead_schema_1.LeadSource.LINKEDIN]: 'LinkedIn',
    [lead_schema_1.LeadSource.COLD_OUTREACH]: 'Cold Outreach',
    [lead_schema_1.LeadSource.EVENT]: 'Events',
};
let AnalyticsService = class AnalyticsService {
    leadModel;
    dealModel;
    constructor(leadModel, dealModel) {
        this.leadModel = leadModel;
        this.dealModel = dealModel;
    }
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
        const countsBySource = new Map();
        for (const r of results) {
            countsBySource.set(r._id, r.value);
        }
        return Object.values(lead_schema_1.LeadSource).map((source) => ({
            name: SOURCE_LABELS[source] ?? source,
            value: countsBySource.get(source) ?? 0,
        }));
    }
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
                            $cond: [{ $eq: ['$stage', deal_schema_1.DealStage.CLOSED_WON] }, '$value', 0],
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
        const map = new Map();
        for (const r of results) {
            map.set(`${r._id.year}-${r._id.month}`, {
                actual: r.actual ?? 0,
                forecast: Math.round(r.forecast ?? 0),
            });
        }
        const data = [];
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
    async getSegments() {
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
        const labels = {
            '0': 'Small (< ₹50K)',
            '50000': 'Medium (₹50K–₹200K)',
            '200000': 'Large (₹200K–₹1M)',
            '1000000': 'Enterprise (> ₹1M)',
            Unknown: 'Unknown',
        };
        const order = ['0', '50000', '200000', '1000000'];
        const countsByBucket = new Map();
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __param(1, (0, mongoose_1.InjectModel)(deal_schema_1.Deal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map