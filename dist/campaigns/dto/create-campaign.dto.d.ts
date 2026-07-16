import { CampaignStatus, CampaignType } from '../schemas/campaign.schema';
export declare class CreateCampaignDto {
    name: string;
    type?: CampaignType;
    status?: CampaignStatus;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    targetAudience?: string;
    goal?: string;
    description?: string;
}
