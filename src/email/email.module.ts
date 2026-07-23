import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailMessage, EmailMessageSchema } from './schemas/email-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailMessage.name, schema: EmailMessageSchema },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
