import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsQueryDto } from './dto/organizations-query.dto';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let modelMock: any;

  const savedOrganization = { _id: 'org1', name: 'Acme Inc' };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'org1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: getModelToken(Organization.name), useValue: modelMock },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created organization', async () => {
      const dto: CreateOrganizationDto = { name: 'Acme Inc' };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'org1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedOrganization]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: OrganizationsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedOrganization], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the organization when found', async () => {
      modelMock.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedOrganization),
      });
      const result = await service.findOne('org1');
      expect(modelMock.findById).toHaveBeenCalledWith('org1');
      expect(result).toEqual(savedOrganization);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated organization', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedOrganization),
      });
      const result = await service.update('org1', { name: 'New Name' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'org1',
        { name: 'New Name' },
        { new: true },
      );
      expect(result).toEqual(savedOrganization);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted organization', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedOrganization),
      });
      const result = await service.remove('org1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('org1');
      expect(result).toEqual(savedOrganization);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
