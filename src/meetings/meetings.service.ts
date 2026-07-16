import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from './schemas/meeting.schema';
import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name) private readonly meetingModel: Model<Meeting>,
  ) {}

  create(createMeetingDto: CreateMeetingDto) {
    const created = new this.meetingModel(createMeetingDto);
    return created.save();
  }

  findAll() {
    return this.meetingModel.find().exec();
  }

  findOne(id: string) {
    return this.meetingModel.findById(id).exec();
  }

  update(id: string, updateMeetingDto: UpdateMeetingDto) {
    return this.meetingModel
      .findByIdAndUpdate(id, updateMeetingDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.meetingModel.findByIdAndDelete(id).exec();
  }
}
