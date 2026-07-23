import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateThreadMessageDto } from './dto/create-thread-message.dto';
import { ThreadsQueryDto } from './dto/threads-query.dto';

@Controller('collaboration/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  findAll(@Query() query: ThreadsQueryDto) {
    return this.threadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadsService.update(id, updateThreadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadsService.remove(id);
  }

  @Post(':id/messages')
  addMessage(
    @Param('id') id: string,
    @Body() createThreadMessageDto: CreateThreadMessageDto,
  ) {
    return this.threadsService.addMessage(id, createThreadMessageDto);
  }
}
