"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./schemas/task.schema");
const common_1 = require("@nestjs/common");
const paginate_1 = require("../common/utils/paginate");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_schema_1 = require("../notifications/schemas/notification.schema");
let TasksService = class TasksService {
    taskModel;
    notificationsService;
    constructor(taskModel, notificationsService) {
        this.taskModel = taskModel;
        this.notificationsService = notificationsService;
    }
    async create(createTaskDto) {
        const created = await new this.taskModel(createTaskDto).save();
        if (created.assignee) {
            try {
                await this.notificationsService.create({
                    title: 'Task assigned',
                    message: `Task "${created.title}" was assigned to ${created.assignee}.`,
                    type: notification_schema_1.NotificationType.INFO,
                    relatedEntityType: 'task',
                    relatedEntityId: String(created._id),
                });
            }
            catch {
            }
        }
        return created;
    }
    findAll(query) {
        const filter = {};
        if (query.status !== undefined) {
            filter.status = query.status;
        }
        if (query.priority !== undefined) {
            filter.priority = query.priority;
        }
        return (0, paginate_1.paginate)(this.taskModel, filter, query);
    }
    async findOne(id) {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new common_1.NotFoundException(`Task ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.taskModel
            .findByIdAndUpdate(id, updateTaskDto, { new: true })
            .exec();
        if (!task) {
            throw new common_1.NotFoundException(`Task ${id} not found`);
        }
        return task;
    }
    async remove(id) {
        const task = await this.taskModel.findByIdAndDelete(id).exec();
        if (!task) {
            throw new common_1.NotFoundException(`Task ${id} not found`);
        }
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map