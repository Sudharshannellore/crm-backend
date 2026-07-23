import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsQueryDto } from './dto/contacts-query.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact.schema").Contact, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/contact.schema").Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: ContactsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/contact.schema").Contact>>;
    findOne(id: string): Promise<import("./schemas/contact.schema").Contact>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<import("./schemas/contact.schema").Contact>;
    remove(id: string): Promise<import("./schemas/contact.schema").Contact>;
}
