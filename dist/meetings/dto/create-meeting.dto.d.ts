import { MeetingType } from '../schemas/meeting.schema';
export declare class CreateMeetingDto {
    title: string;
    type?: MeetingType;
    date: Date;
    time: string;
    duration?: number;
    location?: string;
    agenda?: string;
    reminders?: number;
}
