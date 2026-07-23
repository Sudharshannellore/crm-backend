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
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const integration_schema_1 = require("./schemas/integration.schema");
const paginate_1 = require("../common/utils/paginate");
let IntegrationsService = class IntegrationsService {
    integrationModel;
    constructor(integrationModel) {
        this.integrationModel = integrationModel;
    }
    create(createIntegrationDto) {
        const created = new this.integrationModel(createIntegrationDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.category) {
            filter.category = query.category;
        }
        return (0, paginate_1.paginate)(this.integrationModel, filter, query);
    }
    async findOne(id) {
        const integration = await this.integrationModel.findById(id).exec();
        if (!integration) {
            throw new common_1.NotFoundException(`Integration ${id} not found`);
        }
        return integration;
    }
    async update(id, updateIntegrationDto) {
        const integration = await this.integrationModel
            .findByIdAndUpdate(id, updateIntegrationDto, { new: true })
            .exec();
        if (!integration) {
            throw new common_1.NotFoundException(`Integration ${id} not found`);
        }
        return integration;
    }
    async remove(id) {
        const integration = await this.integrationModel
            .findByIdAndDelete(id)
            .exec();
        if (!integration) {
            throw new common_1.NotFoundException(`Integration ${id} not found`);
        }
        return integration;
    }
    async connect(id) {
        const integration = await this.integrationModel
            .findByIdAndUpdate(id, { status: integration_schema_1.IntegrationStatus.CONNECTED, connectedAt: new Date() }, { new: true })
            .exec();
        if (!integration) {
            throw new common_1.NotFoundException(`Integration ${id} not found`);
        }
        return integration;
    }
    async disconnect(id) {
        const integration = await this.integrationModel
            .findByIdAndUpdate(id, { status: integration_schema_1.IntegrationStatus.DISCONNECTED, connectedAt: null }, { new: true })
            .exec();
        if (!integration) {
            throw new common_1.NotFoundException(`Integration ${id} not found`);
        }
        return integration;
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(integration_schema_1.Integration.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map