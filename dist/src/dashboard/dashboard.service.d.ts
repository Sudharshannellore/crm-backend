import { Model } from 'mongoose';
import { LeadDocument } from '../leads/schemas/lead.schema';
import { DealDocument } from '../deals/schemas/deal.schema';
import { TaskDocument } from '../tasks/schemas/task.schema';
import { MeetingDocument } from '../meetings/schemas/meeting.schema';
export declare class DashboardService {
    private leadModel;
    private dealModel;
    private taskModel;
    private meetingModel;
    constructor(leadModel: Model<LeadDocument>, dealModel: Model<DealDocument>, taskModel: Model<TaskDocument>, meetingModel: Model<MeetingDocument>);
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
    getConversionFunnel(): Promise<{
        stage: string;
        count: number;
    }[]>;
    getActivity(limit?: number): Promise<{
        type: string;
        title: any;
        timestamp: any;
        id: any;
    }[]>;
}
