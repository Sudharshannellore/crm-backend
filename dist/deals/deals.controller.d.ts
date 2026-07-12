import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/deal.schema").Deal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/deal.schema").Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/deal.schema").Deal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/deal.schema").Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/deal.schema").Deal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/deal.schema").Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateDealDto: UpdateDealDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/deal.schema").Deal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/deal.schema").Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/deal.schema").Deal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/deal.schema").Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
