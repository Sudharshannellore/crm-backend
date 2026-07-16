import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { ContactsService } from '../contacts/contacts.service';
export declare class LeadsService {
    private readonly leadModel;
    private readonly organizationsService;
    private readonly contactsService;
    constructor(leadModel: Model<Lead>, organizationsService: OrganizationsService, contactsService: ContactsService);
    create(createLeadDto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<(import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    private convertIfFinalStage;
}
