"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_email_message_dto_1 = require("./create-email-message.dto");
class UpdateEmailMessageDto extends (0, mapped_types_1.PartialType)(create_email_message_dto_1.CreateEmailMessageDto) {
}
exports.UpdateEmailMessageDto = UpdateEmailMessageDto;
//# sourceMappingURL=update-email-message.dto.js.map