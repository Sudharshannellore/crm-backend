"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const template_schema_1 = require("./schemas/template.schema");
const paginate_1 = require("../common/utils/paginate");
let TemplatesService = class TemplatesService {
    templateModel;
    constructor(templateModel) {
        this.templateModel = templateModel;
    }
    create(createTemplateDto) {
        const created = new this.templateModel(createTemplateDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.category) {
            filter.category = query.category;
        }
        return (0, paginate_1.paginate)(this.templateModel, filter, query);
    }
    async findOne(id) {
        const template = await this.templateModel.findById(id).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template ${id} not found`);
        }
        return template;
    }
    async update(id, updateTemplateDto) {
        const template = await this.templateModel
            .findByIdAndUpdate(id, updateTemplateDto, { new: true })
            .exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template ${id} not found`);
        }
        return template;
    }
    async remove(id) {
        const template = await this.templateModel.findByIdAndDelete(id).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Template ${id} not found`);
        }
        return template;
    }
    interpolate(text, vars) {
        if (!text)
            return '';
        return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, token) => {
            const value = vars?.[token];
            return value === undefined || value === null ? '' : String(value);
        });
    }
    async render(id, vars = {}) {
        const template = await this.findOne(id);
        return {
            subject: this.interpolate(template.subject, vars),
            body: this.interpolate(template.content, vars),
        };
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(template_schema_1.Template.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map