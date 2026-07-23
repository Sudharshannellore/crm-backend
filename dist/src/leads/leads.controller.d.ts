import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsQueryDto } from './dto/leads-query.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: LeadsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/lead.schema").Lead>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
