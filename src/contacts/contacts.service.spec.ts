import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ContactsService } from './contacts.service';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactsQueryDto } from './dto/contacts-query.dto';

describe('ContactsService', () => {
  let service: ContactsService;
  let modelMock: any;

  const savedContact = { _id: 'contact1', name: 'Jane Doe', email: 'jane@example.com' };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'contact1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: getModelToken(Contact.name), useValue: modelMock },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created contact', async () => {
      const dto: CreateContactDto = { name: 'Jane Doe', email: 'jane@example.com' };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'contact1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedContact]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: ContactsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedContact], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the contact when found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(savedContact) });
      const result = await service.findOne('contact1');
      expect(modelMock.findById).toHaveBeenCalledWith('contact1');
      expect(result).toEqual(savedContact);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated contact', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedContact),
      });
      const result = await service.update('contact1', { name: 'New Name' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'contact1',
        { name: 'New Name' },
        { new: true },
      );
      expect(result).toEqual(savedContact);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted contact', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedContact),
      });
      const result = await service.remove('contact1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('contact1');
      expect(result).toEqual(savedContact);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
