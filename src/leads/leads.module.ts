import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from './schemas/lead.schema';
import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
