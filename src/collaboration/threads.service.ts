import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread, ThreadDocument } from './schemas/thread.schema';
import { SharedNote, SharedNoteDocument } from './schemas/shared-note.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateThreadMessageDto } from './dto/create-thread-message.dto';
import { ThreadsQueryDto } from './dto/threads-query.dto';
import { paginate } from '../common/utils/paginate';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Thread.name) private readonly threadModel: Model<ThreadDocument>,
    @InjectModel(SharedNote.name)
    private readonly sharedNoteModel: Model<SharedNoteDocument>,
  ) {}

  private static readonly MENTION_RE = /@([\w.-]+)/;

  /**
   * Recent @mentions feed derived from thread messages and shared notes.
   * Any text containing an "@handle" token is surfaced. Returns newest first:
   * [{ id, text, author, createdAt, threadId? }].
   */
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

    const items: {
      id: string;
      text: string;
      author: string;
      createdAt: Date;
      threadId?: string;
    }[] = [];

    for (const thread of threads) {
      for (const msg of thread.messages ?? []) {
        if (ThreadsService.MENTION_RE.test(msg.text)) {
          items.push({
            id: `${String((thread as any)._id)}:${msg.timestamp?.getTime?.() ?? ''}`,
            text: msg.text,
            author: msg.author,
            createdAt: msg.timestamp ?? (thread as any).updatedAt,
            threadId: String((thread as any)._id),
          });
        }
      }
    }

    for (const note of notes) {
      if (note.content && ThreadsService.MENTION_RE.test(note.content)) {
        items.push({
          id: String((note as any)._id),
          text: note.content,
          author: note.author,
          createdAt: (note as any).updatedAt ?? (note as any).createdAt,
        });
      }
    }

    items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return items.slice(0, limit);
  }

  create(createThreadDto: CreateThreadDto) {
    const created = new this.threadModel(createThreadDto);
    return created.save();
  }

  findAll(query: ThreadsQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.tag) filter.tags = query.tag;
    return paginate(this.threadModel, filter, query);
  }

  async findOne(id: string) {
    const thread = await this.threadModel.findById(id).exec();
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`);
    }
    return thread;
  }

  async update(id: string, updateThreadDto: UpdateThreadDto) {
    const thread = await this.threadModel
      .findByIdAndUpdate(id, updateThreadDto, { new: true })
      .exec();
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`);
    }
    return thread;
  }

  async remove(id: string) {
    const thread = await this.threadModel.findByIdAndDelete(id).exec();
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`);
    }
    return thread;
  }

  async addMessage(id: string, createThreadMessageDto: CreateThreadMessageDto) {
    const thread = await this.threadModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            messages: { ...createThreadMessageDto, timestamp: new Date() },
          },
        },
        { new: true },
      )
      .exec();
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`);
    }
    return thread;
  }
}
