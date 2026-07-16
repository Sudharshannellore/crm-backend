import { Model } from 'mongoose';
import { Deal, DealDocument } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
export declare class DealsService {
    private dealModel;
    constructor(dealModel: Model<DealDocument>);
    create(createDealDto: CreateDealDto): Promise<Deal>;
    findAll(): Promise<Deal[]>;
    findOne(id: string): Promise<Deal>;
}
