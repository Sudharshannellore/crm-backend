import { TemplateCategory } from '../schemas/template.schema';
export declare class CreateTemplateDto {
    name: string;
    subject?: string;
    content: string;
    category?: TemplateCategory;
    tags?: string[];
    usageCount?: number;
    lastUsedAt?: Date;
}
