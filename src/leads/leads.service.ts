import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Lead, LeadDocument, LeadStatus } from './schemas/lead.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { ContactsService } from '../contacts/contacts.service';
import { ContactType } from '../contacts/schemas/contact.schema';
import { QueryFilter } from 'mongoose';
import { LeadsQueryDto } from './dto/leads-query.dto';
import { paginate } from '../common/utils/paginate';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';

// The final stage of the lead pipeline. Reaching it converts the lead into an
// organization + contact.
const FINAL_STAGE = LeadStatus.QUALIFIED;

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    @InjectConnection() private readonly connection: Connection,
    private readonly organizationsService: OrganizationsService,
    private readonly contactsService: ContactsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  /** Fire-and-forget notification; never let a notification failure break the caller. */
  private async notifySafe(dto: {
    title: string;
    message?: string;
    type?: NotificationType;
    relatedEntityType?: string;
    relatedEntityId?: string;
  }): Promise<void> {
    try {
      await this.notificationsService.create(dto);
    } catch {
      // swallow — notifications are non-fatal
    }
  }

  async create(createLeadDto: CreateLeadDto) {
    const created = await new this.leadModel(createLeadDto).save();
    await this.notifySafe({
      title: 'New lead created',
      message: `${created.name}${created.company ? ` (${created.company})` : ''} was added as a new lead.`,
      type: NotificationType.LEAD,
      relatedEntityType: 'lead',
      relatedEntityId: String(created._id),
    });
    return this.convertIfFinalStage(created);
  }

  findAll(query: LeadsQueryDto) {
    const filter: QueryFilter<Lead> = {};
    if (query.status !== undefined) {
      filter.status = query.status;
    }
    if (query.source !== undefined) {
      filter.source = query.source;
    }
    return paginate(this.leadModel, filter, query);
  }

  async findOne(id: string) {
    const lead = await this.leadModel.findById(id).exec();
    if (!lead) {
      throw new NotFoundException(`Lead ${id} not found`);
    }
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const updated = await this.leadModel
      .findByIdAndUpdate(id, updateLeadDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Lead ${id} not found`);
    }
    return this.convertIfFinalStage(updated);
  }

  async remove(id: string) {
    const deleted = await this.leadModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Lead ${id} not found`);
    }
    return deleted;
  }

  /**
   * When a lead reaches the final stage, auto-create an organization and a
   * contact from its details and link them back onto the lead. Idempotent: a
   * lead that already carries an `organizationId` is never converted twice.
   * Runs the org+contact creation and the lead update in one transaction so a
   * failure partway through never leaves an orphaned organization/contact or
   * a lead that looks unconverted despite the side-effect records existing.
   */
  private async convertIfFinalStage(lead: LeadDocument): Promise<LeadDocument> {
    if (lead.status !== FINAL_STAGE || lead.organizationId) {
      return lead;
    }

    const session = await this.connection.startSession();
    try {
      let result: LeadDocument = lead;
      await session.withTransaction(async () => {
        const organization = await this.organizationsService.create(
          {
            name: lead.company,
            phone: lead.phone,
            description:
              lead.notes || `Auto-created from qualified lead "${lead.name}".`,
          },
          session,
        );
        const organizationId = String(organization._id);

        const contact = await this.contactsService.create(
          {
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.phone,
            type: ContactType.CUSTOMER,
            location: lead.territory,
            bio: lead.notes,
            organizationId,
          },
          session,
        );

        lead.organizationId = organizationId;
        lead.contactId = String(contact._id);
        lead.convertedAt = new Date();
        result = await lead.save({ session });
      });
      await this.notifySafe({
        title: 'Lead qualified & converted',
        message: `${result.name}${result.company ? ` (${result.company})` : ''} was qualified and converted into an organization + contact.`,
        type: NotificationType.LEAD,
        relatedEntityType: 'lead',
        relatedEntityId: String(result._id),
      });
      return result;
    } finally {
      await session.endSession();
    }
  }
}
