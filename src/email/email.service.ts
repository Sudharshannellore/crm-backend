import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { paginate } from '../common/utils/paginate';
import { CreateEmailMessageDto } from './dto/create-email-message.dto';
import { EmailMessagesQueryDto } from './dto/email-messages-query.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateEmailMessageDto } from './dto/update-email-message.dto';
import {
  EmailMailbox,
  EmailMessage,
  EmailMessageDocument,
} from './schemas/email-message.schema';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    @InjectModel(EmailMessage.name)
    private readonly emailMessageModel: Model<EmailMessageDocument>,
    private readonly configService: ConfigService,
  ) {}

  create(createEmailMessageDto: CreateEmailMessageDto) {
    const created = new this.emailMessageModel(createEmailMessageDto);
    return created.save();
  }

  findAll(query: EmailMessagesQueryDto) {
    const filter: QueryFilter<EmailMessage> = {};
    if (query.mailbox !== undefined) {
      filter.mailbox = query.mailbox;
    }
    return paginate(this.emailMessageModel, filter, query);
  }

  async findOne(id: string) {
    const message = await this.emailMessageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Email message ${id} not found`);
    }
    return message;
  }

  async update(id: string, updateEmailMessageDto: UpdateEmailMessageDto) {
    const updated = await this.emailMessageModel
      .findByIdAndUpdate(id, updateEmailMessageDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Email message ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.emailMessageModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Email message ${id} not found`);
    }
    return deleted;
  }

  async setRead(id: string, read = true) {
    const updated = await this.emailMessageModel
      .findByIdAndUpdate(id, { read }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Email message ${id} not found`);
    }
    return updated;
  }

  async toggleStar(id: string) {
    const message = await this.emailMessageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Email message ${id} not found`);
    }
    message.starred = !message.starred;
    return message.save();
  }

  /**
   * Lazily builds a Gmail transporter (via nodemailer's `service: 'gmail'`
   * shorthand, which resolves the right SMTP host/port/TLS settings) from
   * env vars. Requires a Gmail App Password (not the account password) since
   * Google blocks plain password auth for SMTP — generate one at
   * https://myaccount.google.com/apppasswords with 2FA enabled on the
   * account. Returns null (rather than throwing) when unconfigured, so
   * callers can surface a clear, non-crashing error to the client.
   */
  private getTransporter(): nodemailer.Transporter | null {
    if (this.transporter) {
      return this.transporter;
    }

    const user = this.configService.get<string>('GMAIL_USER');
    const pass = this.configService.get<string>('GMAIL_APP_PASSWORD');

    if (!user || !pass) {
      return null;
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
    return this.transporter;
  }

  async send(sendEmailDto: SendEmailDto) {
    const transporter = this.getTransporter();
    if (!transporter) {
      throw new ServiceUnavailableException(
        'Email sending is not configured — set GMAIL_USER and GMAIL_APP_PASSWORD',
      );
    }

    const from = this.configService.get<string>('GMAIL_USER') as string;
    const { to, cc, bcc, subject, body } = sendEmailDto;

    await transporter.sendMail({
      from,
      to,
      cc,
      bcc,
      subject,
      html: body,
    });

    const sentAt = new Date();
    const created = new this.emailMessageModel({
      mailbox: EmailMailbox.SENT,
      from,
      to,
      cc,
      bcc,
      subject,
      body,
      read: true,
      starred: false,
      sentAt,
    });
    return created.save();
  }
}
