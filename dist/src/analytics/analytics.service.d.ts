import { Model } from 'mongoose';
import { LeadDocument } from '../leads/schemas/lead.schema';
import { DealDocument } from '../deals/schemas/deal.schema';
export declare class AnalyticsService {
    private leadModel;
    private dealModel;
    constructor(leadModel: Model<LeadDocument>, dealModel: Model<DealDocument>);
    getRevenueByMonth(): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getLeadsBySource(): Promise<{
        name: string;
        value: number;
    }[]>;
    getForecast(): Promise<{
        month: string;
        actual: number;
        forecast: number;
    }[]>;
    getSegments(): Promise<{
        segment: string;
        value: number;
    }[]>;
    getTeamPerformance(): Promise<{
        name: any;
        deals: any;
        revenue: any;
    }[]>;
}
