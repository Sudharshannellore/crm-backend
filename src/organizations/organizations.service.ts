import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, QueryFilter, Model } from 'mongoose';
import { Organization } from './schemas/organization.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsQueryDto } from './dto/organizations-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto, session?: ClientSession) {
    const created = new this.organizationModel(createOrganizationDto);
    return created.save({ session });
  }

  findAll(query: OrganizationsQueryDto) {
    const filter: QueryFilter<Organization> = {};
    if (query.type !== undefined) {
      filter.type = query.type;
    }
    if (query.industry !== undefined) {
      filter.industry = query.industry;
    }
    return paginate(this.organizationModel, filter, query);
  }

  async findOne(id: string) {
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException(`Organization ${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .exec();
    if (!organization) {
      throw new NotFoundException(`Organization ${id} not found`);
    }
    return organization;
  }

  async remove(id: string) {
    const organization = await this.organizationModel.findByIdAndDelete(id).exec();
    if (!organization) {
      throw new NotFoundException(`Organization ${id} not found`);
    }
    return organization;
  }
}
