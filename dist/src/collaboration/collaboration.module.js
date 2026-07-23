"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaborationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const thread_schema_1 = require("./schemas/thread.schema");
const shared_note_schema_1 = require("./schemas/shared-note.schema");
const threads_service_1 = require("./threads.service");
const shared_notes_service_1 = require("./shared-notes.service");
const threads_controller_1 = require("./threads.controller");
const shared_notes_controller_1 = require("./shared-notes.controller");
const mentions_controller_1 = require("./mentions.controller");
let CollaborationModule = class CollaborationModule {
};
exports.CollaborationModule = CollaborationModule;
exports.CollaborationModule = CollaborationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: thread_schema_1.Thread.name, schema: thread_schema_1.ThreadSchema },
                { name: shared_note_schema_1.SharedNote.name, schema: shared_note_schema_1.SharedNoteSchema },
            ]),
        ],
        controllers: [threads_controller_1.ThreadsController, shared_notes_controller_1.SharedNotesController, mentions_controller_1.MentionsController],
        providers: [threads_service_1.ThreadsService, shared_notes_service_1.SharedNotesService],
    })
], CollaborationModule);
//# sourceMappingURL=collaboration.module.js.map