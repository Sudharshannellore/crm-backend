import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateEmailMessageDto } from './dto/create-email-message.dto';
import { EmailMessagesQueryDto } from './dto/email-messages-query.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateEmailMessageDto } from './dto/update-email-message.dto';
import { EmailMessage, EmailMessageDocument } from './schemas/email-message.schema';
export declare class EmailService {
    private readonly emailMessageModel;
    private readonly configService;
    private transporter;
    constructor(emailMessageModel: Model<EmailMessageDocument>, configService: ConfigService);
    create(createEmailMessageDto: CreateEmailMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: EmailMessagesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<EmailMessage>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateEmailMessageDto: UpdateEmailMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    setRead(id: string, read?: boolean): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    toggleStar(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    private getTransporter;
    send(sendEmailDto: SendEmailDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EmailMessage, {}, import("mongoose").DefaultSchemaOptions> & EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
