import { DealPriority, DealStage } from '../schemas/deal.schema';
export declare class CreateDealDto {
    title: string;
    company?: string;
    value: number;
    closeDate?: Date;
    owner?: string;
    stage?: DealStage;
    priority?: DealPriority;
    probability?: number;
    description?: string;
}
