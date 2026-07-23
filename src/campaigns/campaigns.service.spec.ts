import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignsQueryDto } from './dto/campaigns-query.dto';

describe('CampaignsService', () => {
  let service: CampaignsService;
  let modelMock: any;

  const savedCampaign = { _id: 'campaign1', name: 'Spring Promo' };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'campaign1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignsService,
        { provide: getModelToken(Campaign.name), useValue: modelMock },
      ],
    }).compile();

    service = module.get<CampaignsService>(CampaignsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created campaign', async () => {
      const dto: CreateCampaignDto = { name: 'Spring Promo' };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'campaign1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedCampaign]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: CampaignsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedCampaign], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the campaign when found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(savedCampaign) });
      const result = await service.findOne('campaign1');
      expect(modelMock.findById).toHaveBeenCalledWith('campaign1');
      expect(result).toEqual(savedCampaign);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated campaign', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedCampaign),
      });
      const result = await service.update('campaign1', { name: 'New Name' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'campaign1',
        { name: 'New Name' },
        { new: true },
      );
      expect(result).toEqual(savedCampaign);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted campaign', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedCampaign),
      });
      const result = await service.remove('campaign1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('campaign1');
      expect(result).toEqual(savedCampaign);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
