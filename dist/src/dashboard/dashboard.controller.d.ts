import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        totalLeads: number;
        totalDeals: any;
        totalDealsValue: any;
        tasksDueToday: number;
        tasksOverdue: number;
        upcomingMeetings: number;
    }>;
    getRevenue(): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getActivity(): Promise<{
        type: string;
        title: any;
        timestamp: any;
        id: any;
    }[]>;
    getConversionFunnel(): Promise<{
        stage: string;
        count: number;
    }[]>;
}
