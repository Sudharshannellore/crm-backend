import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private readonly leadModel: Model<Lead>) {}
  create(createLeadDto: CreateLeadDto) {
    const created = new this.leadModel(createLeadDto);
    return created.save();
  }

  findAll() {
    return this.leadModel.find().exec();
  }

  findOne(id: string) {
    return this.leadModel.findById(id).exec();
  }

  update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.leadModel.findByIdAndUpdate(id, updateLeadDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.leadModel.findByIdAndDelete(id).exec();
  }
}
