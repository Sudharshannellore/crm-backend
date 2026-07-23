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
exports.ThreadsController = void 0;
const common_1 = require("@nestjs/common");
const threads_service_1 = require("./threads.service");
const create_thread_dto_1 = require("./dto/create-thread.dto");
const update_thread_dto_1 = require("./dto/update-thread.dto");
const create_thread_message_dto_1 = require("./dto/create-thread-message.dto");
const threads_query_dto_1 = require("./dto/threads-query.dto");
let ThreadsController = class ThreadsController {
    threadsService;
    constructor(threadsService) {
        this.threadsService = threadsService;
    }
    create(createThreadDto) {
        return this.threadsService.create(createThreadDto);
    }
    findAll(query) {
        return this.threadsService.findAll(query);
    }
    findOne(id) {
        return this.threadsService.findOne(id);
    }
    update(id, updateThreadDto) {
        return this.threadsService.update(id, updateThreadDto);
    }
    remove(id) {
        return this.threadsService.remove(id);
    }
    addMessage(id, createThreadMessageDto) {
        return this.threadsService.addMessage(id, createThreadMessageDto);
    }
};
exports.ThreadsController = ThreadsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_thread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [threads_query_dto_1.ThreadsQueryDto]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_thread_dto_1.UpdateThreadDto]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_thread_message_dto_1.CreateThreadMessageDto]),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "addMessage", null);
exports.ThreadsController = ThreadsController = __decorate([
    (0, common_1.Controller)('collaboration/threads'),
    __metadata("design:paramtypes", [threads_service_1.ThreadsService])
], ThreadsController);
//# sourceMappingURL=threads.controller.js.map