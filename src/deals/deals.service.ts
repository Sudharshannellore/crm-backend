import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deal, DealDocument } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deal.name) private dealModel: Model<DealDocument>) {}

  async create(createDealDto: CreateDealDto): Promise<Deal> {
    const createdDeal = new this.dealModel(createDealDto);
    return createdDeal.save();
  }

  async findAll(): Promise<Deal[]> {
    return this.dealModel.find().exec();
  }

  async findOne(id: string): Promise<Deal> {
    const deal = await this.dealModel.findById(id).exec();
    if (!deal) {
      throw new NotFoundException(`${id} not found`);
    }
    return deal;
  }
}
