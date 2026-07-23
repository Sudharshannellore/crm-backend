import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { MeetingType } from '../schemas/meeting.schema';
export declare class MeetingsQueryDto extends PaginationQueryDto {
    type?: MeetingType;
}
