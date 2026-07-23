import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Meeting } from './schemas/meeting.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsQueryDto } from './dto/meetings-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name) private readonly meetingModel: Model<Meeting>,
  ) {}

  create(createMeetingDto: CreateMeetingDto) {
    const created = new this.meetingModel(createMeetingDto);
    return created.save();
  }

  findAll(query: MeetingsQueryDto) {
    const filter: QueryFilter<Meeting> = {};
    if (query.type !== undefined) {
      filter.type = query.type;
    }
    return paginate(this.meetingModel, filter, query);
  }

  async findOne(id: string) {
    const meeting = await this.meetingModel.findById(id).exec();
    if (!meeting) {
      throw new NotFoundException(`Meeting ${id} not found`);
    }
    return meeting;
  }

  async update(id: string, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.meetingModel
      .findByIdAndUpdate(id, updateMeetingDto, { new: true })
      .exec();
    if (!meeting) {
      throw new NotFoundException(`Meeting ${id} not found`);
    }
    return meeting;
  }

  async remove(id: string) {
    const meeting = await this.meetingModel.findByIdAndDelete(id).exec();
    if (!meeting) {
      throw new NotFoundException(`Meeting ${id} not found`);
    }
    return meeting;
  }
}
