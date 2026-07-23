import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { NotificationType } from '../schemas/notification.schema';
export declare class NotificationsQueryDto extends PaginationQueryDto {
    type?: NotificationType;
    read?: boolean;
}
