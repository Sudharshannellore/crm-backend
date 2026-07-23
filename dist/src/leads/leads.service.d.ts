import { Connection, Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { ContactsService } from '../contacts/contacts.service';
import { LeadsQueryDto } from './dto/leads-query.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class LeadsService {
    private readonly leadModel;
    private readonly connection;
    private readonly organizationsService;
    private readonly contactsService;
    private readonly notificationsService;
    constructor(leadModel: Model<Lead>, connection: Connection, organizationsService: OrganizationsService, contactsService: ContactsService, notificationsService: NotificationsService);
    private notifySafe;
    create(createLeadDto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: LeadsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Lead>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    private convertIfFinalStage;
}
