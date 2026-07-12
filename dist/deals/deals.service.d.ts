import { Model } from 'mongoose';
import { Deal } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsService {
    private readonly dealModel;
    constructor(dealModel: Model<Deal>);
    create(createDealDto: CreateDealDto): Promise<import("mongoose").Document<unknown, {}, Deal, {}, import("mongoose").DefaultSchemaOptions> & Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Deal, {}, import("mongoose").DefaultSchemaOptions> & Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: number): Promise<(import("mongoose").Document<unknown, {}, Deal, {}, import("mongoose").DefaultSchemaOptions> & Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: number, updateDealDto: UpdateDealDto): Promise<(import("mongoose").Document<unknown, {}, Deal, {}, import("mongoose").DefaultSchemaOptions> & Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: number): Promise<(import("mongoose").Document<unknown, {}, Deal, {}, import("mongoose").DefaultSchemaOptions> & Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
