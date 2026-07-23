import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { DealsService } from './deals.service';
import { Deal } from './schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { DealsQueryDto } from './dto/deals-query.dto';
import { NotificationsService } from '../notifications/notifications.service';

describe('DealsService', () => {
  let service: DealsService;
  let modelMock: any;

  const savedDeal = { _id: 'deal1', title: 'Big Deal', value: 1000 };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'deal1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DealsService,
        { provide: getModelToken(Deal.name), useValue: modelMock },
        { provide: NotificationsService, useValue: { create: jest.fn().mockResolvedValue({}) } },
      ],
    }).compile();

    service = module.get<DealsService>(DealsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created deal', async () => {
      const dto: CreateDealDto = { title: 'Big Deal', value: 1000 };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'deal1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedDeal]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: DealsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedDeal], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the deal when found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(savedDeal) });
      const result = await service.findOne('deal1');
      expect(modelMock.findById).toHaveBeenCalledWith('deal1');
      expect(result).toEqual(savedDeal);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated deal', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedDeal),
      });
      const result = await service.update('deal1', { title: 'New Title' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'deal1',
        { title: 'New Title' },
        { new: true },
      );
      expect(result).toEqual(savedDeal);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted deal', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedDeal),
      });
      const result = await service.remove('deal1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('deal1');
      expect(result).toEqual(savedDeal);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
