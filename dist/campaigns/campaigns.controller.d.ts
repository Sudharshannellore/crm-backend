import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
export declare class CampaignsController {
    private readonly campaignsService;
    constructor(campaignsService: CampaignsService);
    create(createCampaignDto: CreateCampaignDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
