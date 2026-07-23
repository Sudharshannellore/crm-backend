import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignsQueryDto } from './dto/campaigns-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
  ) {}

  create(createCampaignDto: CreateCampaignDto) {
    const created = new this.campaignModel(createCampaignDto);
    return created.save();
  }

  findAll(query: CampaignsQueryDto) {
    const filter: QueryFilter<Campaign> = {};
    if (query.status !== undefined) {
      filter.status = query.status;
    }
    if (query.type !== undefined) {
      filter.type = query.type;
    }
    return paginate(this.campaignModel, filter, query);
  }

  async findOne(id: string) {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException(`Campaign ${id} not found`);
    }
    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.campaignModel
      .findByIdAndUpdate(id, updateCampaignDto, { new: true })
      .exec();
    if (!campaign) {
      throw new NotFoundException(`Campaign ${id} not found`);
    }
    return campaign;
  }

  async remove(id: string) {
    const campaign = await this.campaignModel.findByIdAndDelete(id).exec();
    if (!campaign) {
      throw new NotFoundException(`Campaign ${id} not found`);
    }
    return campaign;
  }
}
