import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './schemas/organization.schema';
import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const created = new this.organizationModel(createOrganizationDto);
    return created.save();
  }

  findAll() {
    return this.organizationModel.find().exec();
  }

  findOne(id: string) {
    return this.organizationModel.findById(id).exec();
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.organizationModel.findByIdAndDelete(id).exec();
  }
}
