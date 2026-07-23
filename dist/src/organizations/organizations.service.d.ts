import { ClientSession, Model } from 'mongoose';
import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsQueryDto } from './dto/organizations-query.dto';
export declare class OrganizationsService {
    private readonly organizationModel;
    constructor(organizationModel: Model<Organization>);
    create(createOrganizationDto: CreateOrganizationDto, session?: ClientSession): Promise<import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: OrganizationsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Organization>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Organization, {}, import("mongoose").DefaultSchemaOptions> & Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
