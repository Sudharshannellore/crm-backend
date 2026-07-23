import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesQueryDto } from './dto/templates-query.dto';
export declare class TemplatesService {
    private readonly templateModel;
    constructor(templateModel: Model<TemplateDocument>);
    create(createTemplateDto: CreateTemplateDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Template, {}, import("mongoose").DefaultSchemaOptions> & Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Template, {}, import("mongoose").DefaultSchemaOptions> & Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: TemplatesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Template>>;
    findOne(id: string): Promise<Template>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<Template>;
    remove(id: string): Promise<Template>;
    interpolate(text: string | undefined, vars: Record<string, any>): string;
    render(id: string, vars?: Record<string, any>): Promise<{
        subject: string;
        body: string;
    }>;
}
