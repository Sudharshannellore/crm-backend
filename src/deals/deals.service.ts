import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Deal, DealDocument, DealStage } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsQueryDto } from './dto/deals-query.dto';
import { paginate } from '../common/utils/paginate';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';

// Stage values that count as a deal being won (schema enum plus the
// hyphenated 'closed-won' variant the frontend sometimes sends).
const WON_STAGES = new Set<string>([DealStage.CLOSED_WON, 'won', 'closed-won']);

@Injectable()
export class DealsService {
  constructor(
    @InjectModel(Deal.name) private dealModel: Model<DealDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  private async notifySafe(dto: {
    title: string;
    message?: string;
    type?: NotificationType;
    relatedEntityType?: string;
    relatedEntityId?: string;
  }): Promise<void> {
    try {
      await this.notificationsService.create(dto);
    } catch {
      // swallow — notifications are non-fatal
    }
  }

  async create(createDealDto: CreateDealDto): Promise<Deal> {
    const createdDeal = new this.dealModel(createDealDto);
    const saved = await createdDeal.save();
    await this.notifySafe({
      title: 'New deal created',
      message: `Deal "${saved.title}"${saved.company ? ` with ${saved.company}` : ''} was created.`,
      type: NotificationType.DEAL,
      relatedEntityType: 'deal',
      relatedEntityId: String(saved._id),
    });
    if (WON_STAGES.has(String(saved.stage))) {
      await this.notifyWon(saved);
    }
    return saved;
  }

  private async notifyWon(deal: DealDocument): Promise<void> {
    await this.notifySafe({
      title: 'Deal won',
      message: `Deal "${deal.title}"${deal.company ? ` with ${deal.company}` : ''} was won (₹${deal.value}).`,
      type: NotificationType.SUCCESS,
      relatedEntityType: 'deal',
      relatedEntityId: String(deal._id),
    });
  }

  async findAll(query: DealsQueryDto): Promise<PaginatedResult<Deal>> {
    const filter: QueryFilter<Deal> = {};
    if (query.stage !== undefined) {
      filter.stage = query.stage;
    }
    if (query.priority !== undefined) {
      filter.priority = query.priority;
    }
    return paginate(this.dealModel, filter, query);
  }

  async findOne(id: string): Promise<Deal> {
    const deal = await this.dealModel.findById(id).exec();
    if (!deal) {
      throw new NotFoundException(`${id} not found`);
    }
    return deal;
  }

  async update(id: string, updateDealDto: UpdateDealDto): Promise<Deal> {
    const previous = await this.dealModel.findById(id).exec();
    const deal = await this.dealModel
      .findByIdAndUpdate(id, updateDealDto, { new: true })
      .exec();
    if (!deal) {
      throw new NotFoundException(`${id} not found`);
    }
    // Notify only on the transition into a won stage, not on every update.
    const wasWon = previous ? WON_STAGES.has(String(previous.stage)) : false;
    if (!wasWon && WON_STAGES.has(String(deal.stage))) {
      await this.notifyWon(deal);
    }
    return deal;
  }

  async remove(id: string): Promise<Deal> {
    const deal = await this.dealModel.findByIdAndDelete(id).exec();
    if (!deal) {
      throw new NotFoundException(`${id} not found`);
    }
    return deal;
  }
}
