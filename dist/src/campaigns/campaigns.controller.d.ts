import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignsQueryDto } from './dto/campaigns-query.dto';
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
    findAll(query: CampaignsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/campaign.schema").Campaign>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
