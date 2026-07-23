import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { SharedNotesService } from './shared-notes.service';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';
import { UpdateSharedNoteDto } from './dto/update-shared-note.dto';
import { SharedNotesQueryDto } from './dto/shared-notes-query.dto';

@Controller('collaboration/notes')
export class SharedNotesController {
  constructor(private readonly sharedNotesService: SharedNotesService) {}

  @Post()
  create(@Body() createSharedNoteDto: CreateSharedNoteDto) {
    return this.sharedNotesService.create(createSharedNoteDto);
  }

  @Get()
  findAll(@Query() query: SharedNotesQueryDto) {
    return this.sharedNotesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedNotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedNoteDto: UpdateSharedNoteDto) {
    return this.sharedNotesService.update(id, updateSharedNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedNotesService.remove(id);
  }
}
