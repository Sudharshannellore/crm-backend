import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsQueryDto } from './dto/workflows-query.dto';
import { ExecuteWorkflowDto } from './dto/execute-workflow.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    create(createWorkflowDto: CreateWorkflowDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: WorkflowsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/workflow.schema").Workflow>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/workflow.schema").Workflow, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/workflow.schema").Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findRuns(id: string, query: PaginationQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/workflow-run.schema").WorkflowRun>>;
    clearRuns(id: string): Promise<{
        deleted: number;
    }>;
    execute(id: string, executeWorkflowDto: ExecuteWorkflowDto): Promise<import("./schemas/workflow-run.schema").WorkflowRun>;
}
