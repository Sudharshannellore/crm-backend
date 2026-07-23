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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const deal_schema_1 = require("./schemas/deal.schema");
const paginate_1 = require("../common/utils/paginate");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_schema_1 = require("../notifications/schemas/notification.schema");
const WON_STAGES = new Set([deal_schema_1.DealStage.CLOSED_WON, 'won', 'closed-won']);
let DealsService = class DealsService {
    dealModel;
    notificationsService;
    constructor(dealModel, notificationsService) {
        this.dealModel = dealModel;
        this.notificationsService = notificationsService;
    }
    async notifySafe(dto) {
        try {
            await this.notificationsService.create(dto);
        }
        catch {
        }
    }
    async create(createDealDto) {
        const createdDeal = new this.dealModel(createDealDto);
        const saved = await createdDeal.save();
        await this.notifySafe({
            title: 'New deal created',
            message: `Deal "${saved.title}"${saved.company ? ` with ${saved.company}` : ''} was created.`,
            type: notification_schema_1.NotificationType.DEAL,
            relatedEntityType: 'deal',
            relatedEntityId: String(saved._id),
        });
        if (WON_STAGES.has(String(saved.stage))) {
            await this.notifyWon(saved);
        }
        return saved;
    }
    async notifyWon(deal) {
        await this.notifySafe({
            title: 'Deal won',
            message: `Deal "${deal.title}"${deal.company ? ` with ${deal.company}` : ''} was won (₹${deal.value}).`,
            type: notification_schema_1.NotificationType.SUCCESS,
            relatedEntityType: 'deal',
            relatedEntityId: String(deal._id),
        });
    }
    async findAll(query) {
        const filter = {};
        if (query.stage !== undefined) {
            filter.stage = query.stage;
        }
        if (query.priority !== undefined) {
            filter.priority = query.priority;
        }
        return (0, paginate_1.paginate)(this.dealModel, filter, query);
    }
    async findOne(id) {
        const deal = await this.dealModel.findById(id).exec();
        if (!deal) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return deal;
    }
    async update(id, updateDealDto) {
        const previous = await this.dealModel.findById(id).exec();
        const deal = await this.dealModel
            .findByIdAndUpdate(id, updateDealDto, { new: true })
            .exec();
        if (!deal) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        const wasWon = previous ? WON_STAGES.has(String(previous.stage)) : false;
        if (!wasWon && WON_STAGES.has(String(deal.stage))) {
            await this.notifyWon(deal);
        }
        return deal;
    }
    async remove(id) {
        const deal = await this.dealModel.findByIdAndDelete(id).exec();
        if (!deal) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return deal;
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(deal_schema_1.Deal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], DealsService);
//# sourceMappingURL=deals.service.js.map