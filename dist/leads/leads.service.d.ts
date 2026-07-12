import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsService {
    private readonly leadModel;
    constructor(leadModel: Model<Lead>);
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
}
