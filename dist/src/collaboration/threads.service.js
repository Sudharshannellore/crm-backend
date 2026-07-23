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
var ThreadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const thread_schema_1 = require("./schemas/thread.schema");
const shared_note_schema_1 = require("./schemas/shared-note.schema");
const paginate_1 = require("../common/utils/paginate");
let ThreadsService = class ThreadsService {
    static { ThreadsService_1 = this; }
    threadModel;
    sharedNoteModel;
    constructor(threadModel, sharedNoteModel) {
        this.threadModel = threadModel;
        this.sharedNoteModel = sharedNoteModel;
    }
    static MENTION_RE = /@([\w.-]+)/;
    async getMentions(limit = 20) {
        const mentionFilter = { $regex: '@[\\w.-]+' };
        const [threads, notes] = await Promise.all([
            this.threadModel
                .find({ 'messages.text': mentionFilter })
                .sort({ updatedAt: -1 })
                .limit(limit)
                .exec(),
            this.sharedNoteModel
                .find({ content: mentionFilter })
                .sort({ updatedAt: -1 })
                .limit(limit)
                .exec(),
        ]);
        const items = [];
        for (const thread of threads) {
            for (const msg of thread.messages ?? []) {
                if (ThreadsService_1.MENTION_RE.test(msg.text)) {
                    items.push({
                        id: `${String(thread._id)}:${msg.timestamp?.getTime?.() ?? ''}`,
                        text: msg.text,
                        author: msg.author,
                        createdAt: msg.timestamp ?? thread.updatedAt,
                        threadId: String(thread._id),
                    });
                }
            }
        }
        for (const note of notes) {
            if (note.content && ThreadsService_1.MENTION_RE.test(note.content)) {
                items.push({
                    id: String(note._id),
                    text: note.content,
                    author: note.author,
                    createdAt: note.updatedAt ?? note.createdAt,
                });
            }
        }
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return items.slice(0, limit);
    }
    create(createThreadDto) {
        const created = new this.threadModel(createThreadDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.tag)
            filter.tags = query.tag;
        return (0, paginate_1.paginate)(this.threadModel, filter, query);
    }
    async findOne(id) {
        const thread = await this.threadModel.findById(id).exec();
        if (!thread) {
            throw new common_1.NotFoundException(`Thread ${id} not found`);
        }
        return thread;
    }
    async update(id, updateThreadDto) {
        const thread = await this.threadModel
            .findByIdAndUpdate(id, updateThreadDto, { new: true })
            .exec();
        if (!thread) {
            throw new common_1.NotFoundException(`Thread ${id} not found`);
        }
        return thread;
    }
    async remove(id) {
        const thread = await this.threadModel.findByIdAndDelete(id).exec();
        if (!thread) {
            throw new common_1.NotFoundException(`Thread ${id} not found`);
        }
        return thread;
    }
    async addMessage(id, createThreadMessageDto) {
        const thread = await this.threadModel
            .findByIdAndUpdate(id, {
            $push: {
                messages: { ...createThreadMessageDto, timestamp: new Date() },
            },
        }, { new: true })
            .exec();
        if (!thread) {
            throw new common_1.NotFoundException(`Thread ${id} not found`);
        }
        return thread;
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = ThreadsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(thread_schema_1.Thread.name)),
    __param(1, (0, mongoose_1.InjectModel)(shared_note_schema_1.SharedNote.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ThreadsService);
//# sourceMappingURL=threads.service.js.map