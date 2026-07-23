import { Model } from 'mongoose';
import { Meeting } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsQueryDto } from './dto/meetings-query.dto';
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
    findAll(query: MeetingsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Meeting>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Meeting, {}, import("mongoose").DefaultSchemaOptions> & Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
