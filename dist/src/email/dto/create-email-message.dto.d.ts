import { EmailMailbox } from '../schemas/email-message.schema';
export declare class CreateEmailMessageDto {
    mailbox: EmailMailbox;
    from: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    read?: boolean;
    starred?: boolean;
    sentAt?: Date;
    receivedAt?: Date;
    relatedEntityType?: string;
    relatedEntityId?: string;
}
