import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
