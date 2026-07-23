import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Thread, ThreadSchema } from './schemas/thread.schema';
import { SharedNote, SharedNoteSchema } from './schemas/shared-note.schema';
import { ThreadsService } from './threads.service';
import { SharedNotesService } from './shared-notes.service';
import { ThreadsController } from './threads.controller';
import { SharedNotesController } from './shared-notes.controller';
import { MentionsController } from './mentions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
      { name: SharedNote.name, schema: SharedNoteSchema },
    ]),
  ],
  controllers: [ThreadsController, SharedNotesController, MentionsController],
  providers: [ThreadsService, SharedNotesService],
})
export class CollaborationModule {}
