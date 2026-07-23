import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import {
  Integration,
  IntegrationDocument,
  IntegrationStatus,
} from './schemas/integration.schema';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationsQueryDto } from './dto/integrations-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectModel(Integration.name)
    private readonly integrationModel: Model<IntegrationDocument>,
  ) {}

  create(createIntegrationDto: CreateIntegrationDto) {
    const created = new this.integrationModel(createIntegrationDto);
    return created.save();
  }

  findAll(query: IntegrationsQueryDto) {
    const filter: QueryFilter<IntegrationDocument> = {};
    if (query.category) {
      filter.category = query.category;
    }
    return paginate(this.integrationModel, filter, query);
  }

  async findOne(id: string): Promise<Integration> {
    const integration = await this.integrationModel.findById(id).exec();
    if (!integration) {
      throw new NotFoundException(`Integration ${id} not found`);
    }
    return integration;
  }

  async update(
    id: string,
    updateIntegrationDto: UpdateIntegrationDto,
  ): Promise<Integration> {
    const integration = await this.integrationModel
      .findByIdAndUpdate(id, updateIntegrationDto, { new: true })
      .exec();
    if (!integration) {
      throw new NotFoundException(`Integration ${id} not found`);
    }
    return integration;
  }

  async remove(id: string): Promise<Integration> {
    const integration = await this.integrationModel
      .findByIdAndDelete(id)
      .exec();
    if (!integration) {
      throw new NotFoundException(`Integration ${id} not found`);
    }
    return integration;
  }

  async connect(id: string): Promise<Integration> {
    const integration = await this.integrationModel
      .findByIdAndUpdate(
        id,
        { status: IntegrationStatus.CONNECTED, connectedAt: new Date() },
        { new: true },
      )
      .exec();
    if (!integration) {
      throw new NotFoundException(`Integration ${id} not found`);
    }
    return integration;
  }

  async disconnect(id: string): Promise<Integration> {
    const integration = await this.integrationModel
      .findByIdAndUpdate(
        id,
        { status: IntegrationStatus.DISCONNECTED, connectedAt: null },
        { new: true },
      )
      .exec();
    if (!integration) {
      throw new NotFoundException(`Integration ${id} not found`);
    }
    return integration;
  }
}
