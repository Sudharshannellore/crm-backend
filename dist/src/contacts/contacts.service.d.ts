import { ClientSession, Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsQueryDto } from './dto/contacts-query.dto';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
export declare class ContactsService {
    private contactModel;
    constructor(contactModel: Model<ContactDocument>);
    create(createContactDto: CreateContactDto, session?: ClientSession): Promise<ContactDocument>;
    findAll(query: ContactsQueryDto): Promise<PaginatedResult<Contact>>;
    findOne(id: string): Promise<Contact>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<Contact>;
    remove(id: string): Promise<Contact>;
}
