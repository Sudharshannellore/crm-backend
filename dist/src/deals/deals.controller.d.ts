import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsQueryDto } from './dto/deals-query.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): Promise<import("./schemas/deal.schema").Deal>;
    findAll(query: DealsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/deal.schema").Deal>>;
    findOne(id: string): Promise<import("./schemas/deal.schema").Deal>;
    update(id: string, updateDealDto: UpdateDealDto): Promise<import("./schemas/deal.schema").Deal>;
    remove(id: string): Promise<import("./schemas/deal.schema").Deal>;
}
