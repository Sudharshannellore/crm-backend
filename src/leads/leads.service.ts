import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument, LeadStatus } from './schemas/lead.schema';
import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { ContactsService } from '../contacts/contacts.service';
import { ContactType } from '../contacts/schemas/contact.schema';

// The final stage of the lead pipeline. Reaching it converts the lead into an
// organization + contact.
const FINAL_STAGE = LeadStatus.QUALIFIED;

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    private readonly organizationsService: OrganizationsService,
    private readonly contactsService: ContactsService,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    const created = await new this.leadModel(createLeadDto).save();
    return this.convertIfFinalStage(created);
  }

  findAll() {
    return this.leadModel.find().exec();
  }

  findOne(id: string) {
    return this.leadModel.findById(id).exec();
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const updated = await this.leadModel
      .findByIdAndUpdate(id, updateLeadDto, { new: true })
      .exec();
    if (!updated) {
      return updated;
    }
    return this.convertIfFinalStage(updated);
  }

  remove(id: string) {
    return this.leadModel.findByIdAndDelete(id).exec();
  }

  /**
   * When a lead reaches the final stage, auto-create an organization and a
   * contact from its details and link them back onto the lead. Idempotent: a
   * lead that already carries an `organizationId` is never converted twice.
   */
  private async convertIfFinalStage(lead: LeadDocument): Promise<LeadDocument> {
    if (lead.status !== FINAL_STAGE || lead.organizationId) {
      return lead;
    }

    const organization = await this.organizationsService.create({
      name: lead.company,
      phone: lead.phone,
      description:
        lead.notes || `Auto-created from qualified lead "${lead.name}".`,
    });
    const organizationId = String(organization._id);

    const contact = await this.contactsService.create({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      type: ContactType.CUSTOMER,
      location: lead.territory,
      bio: lead.notes,
      organizationId,
    });

    lead.organizationId = organizationId;
    lead.contactId = String(contact._id);
    lead.convertedAt = new Date();
    return lead.save();
  }
}
