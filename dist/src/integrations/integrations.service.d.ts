import { Model } from 'mongoose';
import { Integration, IntegrationDocument } from './schemas/integration.schema';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationsQueryDto } from './dto/integrations-query.dto';
export declare class IntegrationsService {
    private readonly integrationModel;
    constructor(integrationModel: Model<IntegrationDocument>);
    create(createIntegrationDto: CreateIntegrationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Integration, {}, import("mongoose").DefaultSchemaOptions> & Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Integration, {}, import("mongoose").DefaultSchemaOptions> & Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: IntegrationsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Integration>>;
    findOne(id: string): Promise<Integration>;
    update(id: string, updateIntegrationDto: UpdateIntegrationDto): Promise<Integration>;
    remove(id: string): Promise<Integration>;
    connect(id: string): Promise<Integration>;
    disconnect(id: string): Promise<Integration>;
}
