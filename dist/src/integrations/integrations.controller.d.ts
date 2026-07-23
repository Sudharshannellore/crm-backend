import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationsQueryDto } from './dto/integrations-query.dto';
export declare class IntegrationsController {
    private readonly integrationsService;
    constructor(integrationsService: IntegrationsService);
    create(createIntegrationDto: CreateIntegrationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/integration.schema").Integration, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/integration.schema").Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/integration.schema").Integration, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/integration.schema").Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: IntegrationsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/integration.schema").Integration>>;
    findOne(id: string): Promise<import("./schemas/integration.schema").Integration>;
    update(id: string, updateIntegrationDto: UpdateIntegrationDto): Promise<import("./schemas/integration.schema").Integration>;
    connect(id: string): Promise<import("./schemas/integration.schema").Integration>;
    disconnect(id: string): Promise<import("./schemas/integration.schema").Integration>;
    remove(id: string): Promise<import("./schemas/integration.schema").Integration>;
}
