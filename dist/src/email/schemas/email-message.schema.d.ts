import { HydratedDocument } from 'mongoose';
export type EmailMessageDocument = HydratedDocument<EmailMessage>;
export declare enum EmailMailbox {
    INBOX = "inbox",
    SENT = "sent",
    DRAFTS = "drafts"
}
export declare class EmailMessage {
    mailbox: EmailMailbox;
    from: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
    read: boolean;
    starred: boolean;
    sentAt: Date;
    receivedAt: Date;
    relatedEntityType: string;
    relatedEntityId: string;
}
export declare const EmailMessageSchema: import("mongoose").Schema<EmailMessage, import("mongoose").Model<EmailMessage, any, any, any, any, any, EmailMessage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    mailbox?: import("mongoose").SchemaDefinitionProperty<EmailMailbox, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    from?: import("mongoose").SchemaDefinitionProperty<string, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    to?: import("mongoose").SchemaDefinitionProperty<string[], EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    cc?: import("mongoose").SchemaDefinitionProperty<string[], EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bcc?: import("mongoose").SchemaDefinitionProperty<string[], EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    body?: import("mongoose").SchemaDefinitionProperty<string, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    read?: import("mongoose").SchemaDefinitionProperty<boolean, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    starred?: import("mongoose").SchemaDefinitionProperty<boolean, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    sentAt?: import("mongoose").SchemaDefinitionProperty<Date, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    receivedAt?: import("mongoose").SchemaDefinitionProperty<Date, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    relatedEntityType?: import("mongoose").SchemaDefinitionProperty<string, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    relatedEntityId?: import("mongoose").SchemaDefinitionProperty<string, EmailMessage, import("mongoose").Document<unknown, {}, EmailMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, EmailMessage>;
