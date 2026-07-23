import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesQueryDto } from './dto/templates-query.dto';
import { RenderTemplateDto } from './dto/render-template.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(createTemplateDto: CreateTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/template.schema").Template, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/template.schema").Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/template.schema").Template, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/template.schema").Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: TemplatesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/template.schema").Template>>;
    findOne(id: string): Promise<import("./schemas/template.schema").Template>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<import("./schemas/template.schema").Template>;
    remove(id: string): Promise<import("./schemas/template.schema").Template>;
    render(id: string, renderTemplateDto: RenderTemplateDto): Promise<{
        subject: string;
        body: string;
    }>;
}
