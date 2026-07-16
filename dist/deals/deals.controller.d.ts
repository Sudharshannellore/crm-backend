import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): Promise<import("./schemas/deal.schema").Deal>;
    findAll(): Promise<import("./schemas/deal.schema").Deal[]>;
    findOne(id: string): Promise<import("./schemas/deal.schema").Deal>;
}
