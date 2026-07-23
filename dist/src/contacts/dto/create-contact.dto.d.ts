import { ContactType } from '../schemas/contact.schema';
export declare class CreateContactDto {
    name: string;
    title?: string;
    company?: string;
    email: string;
    phone?: string;
    type?: ContactType;
    linkedin?: string;
    location?: string;
    bio?: string;
    organizationId?: string;
}
