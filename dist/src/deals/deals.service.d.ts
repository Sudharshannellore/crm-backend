import { Model } from 'mongoose';
import { Deal, DealDocument } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsQueryDto } from './dto/deals-query.dto';
import { PaginatedResult } from '../common/dto/pagination-query.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class DealsService {
    private dealModel;
    private readonly notificationsService;
    constructor(dealModel: Model<DealDocument>, notificationsService: NotificationsService);
    private notifySafe;
    create(createDealDto: CreateDealDto): Promise<Deal>;
    private notifyWon;
    findAll(query: DealsQueryDto): Promise<PaginatedResult<Deal>>;
    findOne(id: string): Promise<Deal>;
    update(id: string, updateDealDto: UpdateDealDto): Promise<Deal>;
    remove(id: string): Promise<Deal>;
}
