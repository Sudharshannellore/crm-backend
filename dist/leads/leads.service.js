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
const FINAL_STAGE = lead_schema_1.LeadStatus.QUALIFIED;
let LeadsService = class LeadsService {
    leadModel;
    organizationsService;
    contactsService;
    constructor(leadModel, organizationsService, contactsService) {
        this.leadModel = leadModel;
        this.organizationsService = organizationsService;
        this.contactsService = contactsService;
    }
    async create(createLeadDto) {
        const created = await new this.leadModel(createLeadDto).save();
        return this.convertIfFinalStage(created);
    }
    findAll() {
        return this.leadModel.find().exec();
    }
    findOne(id) {
        return this.leadModel.findById(id).exec();
    }
    async update(id, updateLeadDto) {
        const updated = await this.leadModel
            .findByIdAndUpdate(id, updateLeadDto, { new: true })
            .exec();
        if (!updated) {
            return updated;
        }
        return this.convertIfFinalStage(updated);
    }
    remove(id) {
        return this.leadModel.findByIdAndDelete(id).exec();
    }
    async convertIfFinalStage(lead) {
        if (lead.status !== FINAL_STAGE || lead.organizationId) {
            return lead;
        }
        const organization = await this.organizationsService.create({
            name: lead.company,
            phone: lead.phone,
            description: lead.notes || `Auto-created from qualified lead "${lead.name}".`,
        });
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
        });
        lead.organizationId = organizationId;
        lead.contactId = String(contact._id);
        lead.convertedAt = new Date();
        return lead.save();
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        organizations_service_1.OrganizationsService,
        contacts_service_1.ContactsService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map