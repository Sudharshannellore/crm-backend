import { Controller, Get } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('collaboration/mentions')
export class MentionsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get()
  getMentions() {
    return this.threadsService.getMentions();
  }
}
