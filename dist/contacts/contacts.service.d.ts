import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactsService {
    private contactModel;
    constructor(contactModel: Model<ContactDocument>);
    create(createContactDto: CreateContactDto): Promise<ContactDocument>;
    findAll(): Promise<Contact[]>;
    findOne(id: string): Promise<Contact>;
}
