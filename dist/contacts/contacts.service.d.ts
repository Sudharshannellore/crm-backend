import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsService {
    private readonly contactModel;
    constructor(contactModel: Model<Contact>);
    create(createContactDto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, Contact, {}, import("mongoose").DefaultSchemaOptions> & Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Contact, {}, import("mongoose").DefaultSchemaOptions> & Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: number): Promise<(import("mongoose").Document<unknown, {}, Contact, {}, import("mongoose").DefaultSchemaOptions> & Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<(import("mongoose").Document<unknown, {}, Contact, {}, import("mongoose").DefaultSchemaOptions> & Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: number): Promise<(import("mongoose").Document<unknown, {}, Contact, {}, import("mongoose").DefaultSchemaOptions> & Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
