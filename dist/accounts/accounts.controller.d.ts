import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
