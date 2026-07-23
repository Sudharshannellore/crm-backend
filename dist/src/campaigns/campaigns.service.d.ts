import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignsQueryDto } from './dto/campaigns-query.dto';
export declare class CampaignsService {
    private readonly campaignModel;
    constructor(campaignModel: Model<Campaign>);
    create(createCampaignDto: CreateCampaignDto): Promise<import("mongoose").Document<unknown, {}, Campaign, {}, import("mongoose").DefaultSchemaOptions> & Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: CampaignsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Campaign>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Campaign, {}, import("mongoose").DefaultSchemaOptions> & Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<import("mongoose").Document<unknown, {}, Campaign, {}, import("mongoose").DefaultSchemaOptions> & Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Campaign, {}, import("mongoose").DefaultSchemaOptions> & Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
