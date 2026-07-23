import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { MeetingType } from '../schemas/meeting.schema';

export class MeetingsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(MeetingType)
  type?: MeetingType;
}
