"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIntegrationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_integration_dto_1 = require("./create-integration.dto");
class UpdateIntegrationDto extends (0, mapped_types_1.PartialType)(create_integration_dto_1.CreateIntegrationDto) {
}
exports.UpdateIntegrationDto = UpdateIntegrationDto;
//# sourceMappingURL=update-integration.dto.js.map