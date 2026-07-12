import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
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
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/lead.schema").Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
