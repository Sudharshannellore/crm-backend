import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
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
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/meeting.schema").Meeting, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/meeting.schema").Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
