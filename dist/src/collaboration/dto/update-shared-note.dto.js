"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSharedNoteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shared_note_dto_1 = require("./create-shared-note.dto");
class UpdateSharedNoteDto extends (0, mapped_types_1.PartialType)(create_shared_note_dto_1.CreateSharedNoteDto) {
}
exports.UpdateSharedNoteDto = UpdateSharedNoteDto;
//# sourceMappingURL=update-shared-note.dto.js.map