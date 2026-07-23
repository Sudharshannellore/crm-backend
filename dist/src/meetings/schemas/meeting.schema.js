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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSchema = exports.Meeting = exports.MeetingType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var MeetingType;
(function (MeetingType) {
    MeetingType["VIDEO"] = "video";
    MeetingType["PHONE"] = "phone";
    MeetingType["IN_PERSON"] = "in-person";
})(MeetingType || (exports.MeetingType = MeetingType = {}));
let Meeting = class Meeting {
    title;
    type;
    date;
    time;
    duration;
    location;
    agenda;
    reminders;
};
exports.Meeting = Meeting;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Meeting.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: MeetingType, default: MeetingType.VIDEO }),
    __metadata("design:type", String)
], Meeting.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Meeting.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Meeting.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 30 }),
    __metadata("design:type", Number)
], Meeting.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meeting.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meeting.prototype, "agenda", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 15 }),
    __metadata("design:type", Number)
], Meeting.prototype, "reminders", void 0);
exports.Meeting = Meeting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Meeting);
exports.MeetingSchema = mongoose_1.SchemaFactory.createForClass(Meeting);
//# sourceMappingURL=meeting.schema.js.map