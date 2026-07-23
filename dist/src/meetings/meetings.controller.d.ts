import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsQueryDto } from './dto/meetings-query.dto';
export declare class MeetingsController {
    private readonly meetingsService;
    constructor(meetingsService: MeetingsService);
    create(createMeetingDto: CreateMeetingDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: MeetingsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/meeting.schema").Meeting>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
