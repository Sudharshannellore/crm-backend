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
exports.SharedNotesController = void 0;
const common_1 = require("@nestjs/common");
const shared_notes_service_1 = require("./shared-notes.service");
const create_shared_note_dto_1 = require("./dto/create-shared-note.dto");
const update_shared_note_dto_1 = require("./dto/update-shared-note.dto");
const shared_notes_query_dto_1 = require("./dto/shared-notes-query.dto");
let SharedNotesController = class SharedNotesController {
    sharedNotesService;
    constructor(sharedNotesService) {
        this.sharedNotesService = sharedNotesService;
    }
    create(createSharedNoteDto) {
        return this.sharedNotesService.create(createSharedNoteDto);
    }
    findAll(query) {
        return this.sharedNotesService.findAll(query);
    }
    findOne(id) {
        return this.sharedNotesService.findOne(id);
    }
    update(id, updateSharedNoteDto) {
        return this.sharedNotesService.update(id, updateSharedNoteDto);
    }
    remove(id) {
        return this.sharedNotesService.remove(id);
    }
};
exports.SharedNotesController = SharedNotesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shared_note_dto_1.CreateSharedNoteDto]),
    __metadata("design:returntype", void 0)
], SharedNotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_notes_query_dto_1.SharedNotesQueryDto]),
    __metadata("design:returntype", void 0)
], SharedNotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SharedNotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shared_note_dto_1.UpdateSharedNoteDto]),
    __metadata("design:returntype", void 0)
], SharedNotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SharedNotesController.prototype, "remove", null);
exports.SharedNotesController = SharedNotesController = __decorate([
    (0, common_1.Controller)('collaboration/notes'),
    __metadata("design:paramtypes", [shared_notes_service_1.SharedNotesService])
], SharedNotesController);
//# sourceMappingURL=shared-notes.controller.js.map