import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesQueryDto } from './dto/templates-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  create(createTemplateDto: CreateTemplateDto) {
    const created = new this.templateModel(createTemplateDto);
    return created.save();
  }

  findAll(query: TemplatesQueryDto) {
    const filter: QueryFilter<TemplateDocument> = {};
    if (query.category) {
      filter.category = query.category;
    }
    return paginate(this.templateModel, filter, query);
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) {
      throw new NotFoundException(`Template ${id} not found`);
    }
    return template;
  }

  async update(
    id: string,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    const template = await this.templateModel
      .findByIdAndUpdate(id, updateTemplateDto, { new: true })
      .exec();
    if (!template) {
      throw new NotFoundException(`Template ${id} not found`);
    }
    return template;
  }

  async remove(id: string): Promise<Template> {
    const template = await this.templateModel.findByIdAndDelete(id).exec();
    if (!template) {
      throw new NotFoundException(`Template ${id} not found`);
    }
    return template;
  }

  /**
   * Replaces {{token}} placeholders in `text` with values from `vars`.
   * Tokens are matched case-sensitively on trimmed name. Unknown tokens
   * (or those whose value is null/undefined) resolve to an empty string.
   */
  interpolate(text: string | undefined, vars: Record<string, any>): string {
    if (!text) return '';
    return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, token: string) => {
      const value = vars?.[token];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  /**
   * Renders a stored template against a variables object, returning the
   * interpolated { subject, body }. `body` comes from the template `content`.
   */
  async render(
    id: string,
    vars: Record<string, any> = {},
  ): Promise<{ subject: string; body: string }> {
    const template = await this.findOne(id);
    return {
      subject: this.interpolate(template.subject, vars),
      body: this.interpolate(template.content, vars),
    };
  }
}
