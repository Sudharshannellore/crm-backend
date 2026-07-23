import { CreateEmailMessageDto } from './dto/create-email-message.dto';
import { EmailMessagesQueryDto } from './dto/email-messages-query.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateEmailMessageDto } from './dto/update-email-message.dto';
import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    send(sendEmailDto: SendEmailDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(createEmailMessageDto: CreateEmailMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: EmailMessagesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/email-message.schema").EmailMessage>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateEmailMessageDto: UpdateEmailMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    markRead(id: string, read?: boolean): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    toggleStar(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/email-message.schema").EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/email-message.schema").EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
