import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedNote, SharedNoteDocument } from './schemas/shared-note.schema';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';
import { UpdateSharedNoteDto } from './dto/update-shared-note.dto';
import { SharedNotesQueryDto } from './dto/shared-notes-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class SharedNotesService {
  constructor(
    @InjectModel(SharedNote.name)
    private readonly sharedNoteModel: Model<SharedNoteDocument>,
  ) {}

  create(createSharedNoteDto: CreateSharedNoteDto) {
    const created = new this.sharedNoteModel(createSharedNoteDto);
    return created.save();
  }

  findAll(query: SharedNotesQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.tag) filter.tags = query.tag;
    return paginate(this.sharedNoteModel, filter, query);
  }

  async findOne(id: string) {
    const note = await this.sharedNoteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException(`Shared note ${id} not found`);
    }
    return note;
  }

  async update(id: string, updateSharedNoteDto: UpdateSharedNoteDto) {
    const note = await this.sharedNoteModel
      .findByIdAndUpdate(id, updateSharedNoteDto, { new: true })
      .exec();
    if (!note) {
      throw new NotFoundException(`Shared note ${id} not found`);
    }
    return note;
  }

  async remove(id: string) {
    const note = await this.sharedNoteModel.findByIdAndDelete(id).exec();
    if (!note) {
      throw new NotFoundException(`Shared note ${id} not found`);
    }
    return note;
  }
}
