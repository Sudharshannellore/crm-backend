import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private readonly accountModel;
    constructor(accountModel: Model<Account>);
    create(createAccountDto: CreateAccountDto): Promise<import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").DefaultSchemaOptions> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").DefaultSchemaOptions> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: number): Promise<(import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").DefaultSchemaOptions> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: number, updateAccountDto: UpdateAccountDto): Promise<(import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").DefaultSchemaOptions> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: number): Promise<(import("mongoose").Document<unknown, {}, Account, {}, import("mongoose").DefaultSchemaOptions> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
