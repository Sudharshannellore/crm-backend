import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
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
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
