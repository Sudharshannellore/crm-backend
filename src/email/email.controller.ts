import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEmailMessageDto } from './dto/create-email-message.dto';
import { EmailMessagesQueryDto } from './dto/email-messages-query.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateEmailMessageDto } from './dto/update-email-message.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  send(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.send(sendEmailDto);
  }

  @Post('messages')
  create(@Body() createEmailMessageDto: CreateEmailMessageDto) {
    return this.emailService.create(createEmailMessageDto);
  }

  @Get('messages')
  findAll(@Query() query: EmailMessagesQueryDto) {
    return this.emailService.findAll(query);
  }

  @Get('messages/:id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(id);
  }

  @Patch('messages/:id')
  update(
    @Param('id') id: string,
    @Body() updateEmailMessageDto: UpdateEmailMessageDto,
  ) {
    return this.emailService.update(id, updateEmailMessageDto);
  }

  @Delete('messages/:id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(id);
  }

  @Patch('messages/:id/read')
  markRead(@Param('id') id: string, @Body('read') read?: boolean) {
    return this.emailService.setRead(id, read ?? true);
  }

  @Patch('messages/:id/star')
  toggleStar(@Param('id') id: string) {
    return this.emailService.toggleStar(id);
  }
}
