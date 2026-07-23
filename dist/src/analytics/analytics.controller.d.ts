import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getRevenueByMonth(): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getLeadsBySource(): Promise<{
        name: string;
        value: number;
    }[]>;
    getTeamPerformance(): Promise<{
        name: any;
        deals: any;
        revenue: any;
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
}
