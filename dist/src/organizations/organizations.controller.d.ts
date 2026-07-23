import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsQueryDto } from './dto/organizations-query.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: OrganizationsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/organization.schema").Organization>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
