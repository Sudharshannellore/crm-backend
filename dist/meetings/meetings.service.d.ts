import { Model } from 'mongoose';
import { Meeting } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
export declare class MeetingsService {
    private readonly meetingModel;
    constructor(meetingModel: Model<Meeting>);
    create(createMeetingDto: CreateMeetingDto): Promise<import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<(import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
