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
exports.LeadsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("./schemas/lead.schema");
const common_1 = require("@nestjs/common");
const organizations_service_1 = require("../organizations/organizations.service");
const contacts_service_1 = require("../contacts/contacts.service");
const contact_schema_1 = require("../contacts/schemas/contact.schema");
const paginate_1 = require("../common/utils/paginate");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_schema_1 = require("../notifications/schemas/notification.schema");
const FINAL_STAGE = lead_schema_1.LeadStatus.QUALIFIED;
let LeadsService = class LeadsService {
    leadModel;
    connection;
    organizationsService;
    contactsService;
    notificationsService;
    constructor(leadModel, connection, organizationsService, contactsService, notificationsService) {
        this.leadModel = leadModel;
        this.connection = connection;
        this.organizationsService = organizationsService;
        this.contactsService = contactsService;
        this.notificationsService = notificationsService;
    }
    async notifySafe(dto) {
        try {
            await this.notificationsService.create(dto);
        }
        catch {
        }
    }
    async create(createLeadDto) {
        const created = await new this.leadModel(createLeadDto).save();
        await this.notifySafe({
            title: 'New lead created',
            message: `${created.name}${created.company ? ` (${created.company})` : ''} was added as a new lead.`,
            type: notification_schema_1.NotificationType.LEAD,
            relatedEntityType: 'lead',
            relatedEntityId: String(created._id),
        });
        return this.convertIfFinalStage(created);
    }
    findAll(query) {
        const filter = {};
        if (query.status !== undefined) {
            filter.status = query.status;
        }
        if (query.source !== undefined) {
            filter.source = query.source;
        }
        return (0, paginate_1.paginate)(this.leadModel, filter, query);
    }
    async findOne(id) {
        const lead = await this.leadModel.findById(id).exec();
        if (!lead) {
            throw new common_1.NotFoundException(`Lead ${id} not found`);
        }
        return lead;
    }
    async update(id, updateLeadDto) {
        const updated = await this.leadModel
            .findByIdAndUpdate(id, updateLeadDto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Lead ${id} not found`);
        }
        return this.convertIfFinalStage(updated);
    }
    async remove(id) {
        const deleted = await this.leadModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Lead ${id} not found`);
        }
        return deleted;
    }
    async convertIfFinalStage(lead) {
        if (lead.status !== FINAL_STAGE || lead.organizationId) {
            return lead;
        }
        const session = await this.connection.startSession();
        try {
            let result = lead;
            await session.withTransaction(async () => {
                const organization = await this.organizationsService.create({
                    name: lead.company,
                    phone: lead.phone,
                    description: lead.notes || `Auto-created from qualified lead "${lead.name}".`,
                }, session);
                const organizationId = String(organization._id);
                const contact = await this.contactsService.create({
                    name: lead.name,
                    company: lead.company,
                    email: lead.email,
                    phone: lead.phone,
                    type: contact_schema_1.ContactType.CUSTOMER,
                    location: lead.territory,
                    bio: lead.notes,
                    organizationId,
                }, session);
                lead.organizationId = organizationId;
                lead.contactId = String(contact._id);
                lead.convertedAt = new Date();
                result = await lead.save({ session });
            });
            await this.notifySafe({
                title: 'Lead qualified & converted',
                message: `${result.name}${result.company ? ` (${result.company})` : ''} was qualified and converted into an organization + contact.`,
                type: notification_schema_1.NotificationType.LEAD,
                relatedEntityType: 'lead',
                relatedEntityId: String(result._id),
            });
            return result;
        }
        finally {
            await session.endSession();
        }
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection,
        organizations_service_1.OrganizationsService,
        contacts_service_1.ContactsService,
        notifications_service_1.NotificationsService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map