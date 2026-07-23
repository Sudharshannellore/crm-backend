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
exports.SharedNotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shared_note_schema_1 = require("./schemas/shared-note.schema");
const paginate_1 = require("../common/utils/paginate");
let SharedNotesService = class SharedNotesService {
    sharedNoteModel;
    constructor(sharedNoteModel) {
        this.sharedNoteModel = sharedNoteModel;
    }
    create(createSharedNoteDto) {
        const created = new this.sharedNoteModel(createSharedNoteDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.tag)
            filter.tags = query.tag;
        return (0, paginate_1.paginate)(this.sharedNoteModel, filter, query);
    }
    async findOne(id) {
        const note = await this.sharedNoteModel.findById(id).exec();
        if (!note) {
            throw new common_1.NotFoundException(`Shared note ${id} not found`);
        }
        return note;
    }
    async update(id, updateSharedNoteDto) {
        const note = await this.sharedNoteModel
            .findByIdAndUpdate(id, updateSharedNoteDto, { new: true })
            .exec();
        if (!note) {
            throw new common_1.NotFoundException(`Shared note ${id} not found`);
        }
        return note;
    }
    async remove(id) {
        const note = await this.sharedNoteModel.findByIdAndDelete(id).exec();
        if (!note) {
            throw new common_1.NotFoundException(`Shared note ${id} not found`);
        }
        return note;
    }
};
exports.SharedNotesService = SharedNotesService;
exports.SharedNotesService = SharedNotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shared_note_schema_1.SharedNote.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SharedNotesService);
//# sourceMappingURL=shared-notes.service.js.map