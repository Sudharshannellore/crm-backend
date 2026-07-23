import { NotificationType } from '../schemas/notification.schema';
export declare class CreateNotificationDto {
    title: string;
    message?: string;
    type?: NotificationType;
    read?: boolean;
    link?: string;
    relatedEntityType?: string;
    relatedEntityId?: string;
}
