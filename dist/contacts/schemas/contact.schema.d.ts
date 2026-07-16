import { HydratedDocument } from 'mongoose';
export type ContactDocument = HydratedDocument<Contact>;
export declare enum ContactType {
    CUSTOMER = "customer",
    PARTNER = "partner",
    VENDOR = "vendor",
    INFLUENCER = "influencer"
}
export declare class Contact {
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    type: ContactType;
    linkedin: string;
    location: string;
    bio: string;
    organizationId: string;
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, any, any, Contact>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, import("mongoose").Document<unknown, {}, Contact, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<ContactType, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    linkedin?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    organizationId?: import("mongoose").SchemaDefinitionProperty<string, Contact, import("mongoose").Document<unknown, {}, Contact, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Contact>;
