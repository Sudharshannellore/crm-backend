import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
  ) {}

  create(createCampaignDto: CreateCampaignDto) {
    const created = new this.campaignModel(createCampaignDto);
    return created.save();
  }

  findAll() {
    return this.campaignModel.find().exec();
  }

  findOne(id: string) {
    return this.campaignModel.findById(id).exec();
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignModel
      .findByIdAndUpdate(id, updateCampaignDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.campaignModel.findByIdAndDelete(id).exec();
  }
}
