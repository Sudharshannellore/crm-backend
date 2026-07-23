import { Model } from 'mongoose';
import { Workflow, WorkflowDocument } from './schemas/workflow.schema';
import { WorkflowRun, WorkflowRunDocument } from './schemas/workflow-run.schema';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsQueryDto } from './dto/workflows-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { TasksService } from '../tasks/tasks.service';
import { EmailService } from '../email/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { LeadsService } from '../leads/leads.service';
import { DealsService } from '../deals/deals.service';
export declare class WorkflowsService {
    private readonly workflowModel;
    private readonly workflowRunModel;
    private readonly tasksService;
    private readonly emailService;
    private readonly notificationsService;
    private readonly leadsService;
    private readonly dealsService;
    constructor(workflowModel: Model<WorkflowDocument>, workflowRunModel: Model<WorkflowRunDocument>, tasksService: TasksService, emailService: EmailService, notificationsService: NotificationsService, leadsService: LeadsService, dealsService: DealsService);
    create(createWorkflowDto: CreateWorkflowDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: WorkflowsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Workflow>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateWorkflowDto: UpdateWorkflowDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Workflow, {}, import("mongoose").DefaultSchemaOptions> & Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findRuns(workflowId: string, query: PaginationQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<WorkflowRun>>;
    execute(workflowId: string, triggerPayload?: Record<string, any>): Promise<WorkflowRun>;
    private capRuns;
    clearRuns(workflowId: string): Promise<{
        deleted: number;
    }>;
    private isTriggerNode;
    private edgeMatchesBranch;
    private runNode;
    private resolveKind;
    private isCreateTaskAction;
    private handleCreateTask;
    private handleCondition;
    private resolveActionName;
    private handleSendEmail;
    private handleNotifyTeam;
    private toNotificationType;
    private handleUpdateCrm;
    private handleLog;
}
