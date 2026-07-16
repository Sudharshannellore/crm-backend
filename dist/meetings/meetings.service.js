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
exports.MeetingsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meeting_schema_1 = require("./schemas/meeting.schema");
const common_1 = require("@nestjs/common");
let MeetingsService = class MeetingsService {
    meetingModel;
    constructor(meetingModel) {
        this.meetingModel = meetingModel;
    }
    create(createMeetingDto) {
        const created = new this.meetingModel(createMeetingDto);
        return created.save();
    }
    findAll() {
        return this.meetingModel.find().exec();
    }
    findOne(id) {
        return this.meetingModel.findById(id).exec();
    }
    update(id, updateMeetingDto) {
        return this.meetingModel
            .findByIdAndUpdate(id, updateMeetingDto, { new: true })
            .exec();
    }
    remove(id) {
        return this.meetingModel.findByIdAndDelete(id).exec();
    }
};
exports.MeetingsService = MeetingsService;
exports.MeetingsService = MeetingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meeting_schema_1.Meeting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MeetingsService);
//# sourceMappingURL=meetings.service.js.map