import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CampaignStatus, CampaignType } from '../schemas/campaign.schema';
export declare class CampaignsQueryDto extends PaginationQueryDto {
    status?: CampaignStatus;
    type?: CampaignType;
}
