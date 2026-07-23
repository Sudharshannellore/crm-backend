import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, QueryFilter, Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsQueryDto } from './dto/contacts-query.dto';
import { paginate } from '../common/utils/paginate';
import { PaginatedResult } from '../common/dto/pagination-query.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {}

  async create(
    createContactDto: CreateContactDto,
    session?: ClientSession,
  ): Promise<ContactDocument> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save({ session });
  }

  async findAll(query: ContactsQueryDto): Promise<PaginatedResult<Contact>> {
    const filter: QueryFilter<Contact> = {};
    if (query.type !== undefined) {
      filter.type = query.type;
    }
    return paginate(this.contactModel, filter, query);
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`${id} not found`);
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec();
    if (!contact) {
      throw new NotFoundException(`${id} not found`);
    }
    return contact;
  }

  async remove(id: string): Promise<Contact> {
    const contact = await this.contactModel.findByIdAndDelete(id).exec();
    if (!contact) {
      throw new NotFoundException(`${id} not found`);
    }
    return contact;
  }
}
