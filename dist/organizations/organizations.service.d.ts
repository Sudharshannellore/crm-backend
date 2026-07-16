import { Model } from 'mongoose';
import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsService {
    private readonly organizationModel;
    constructor(organizationModel: Model<Organization>);
    create(createOrganizationDto: CreateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<(import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
