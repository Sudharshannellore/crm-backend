import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { LeadsService } from './leads.service';
import { Lead, LeadStatus, LeadSource } from './schemas/lead.schema';
import { OrganizationsService } from '../organizations/organizations.service';
import { ContactsService } from '../contacts/contacts.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsQueryDto } from './dto/leads-query.dto';
import { NotificationsService } from '../notifications/notifications.service';

describe('LeadsService', () => {
  let service: LeadsService;
  let modelMock: any;
  let connectionMock: any;
  let organizationsServiceMock: jest.Mocked<Pick<OrganizationsService, 'create'>>;
  let contactsServiceMock: jest.Mocked<Pick<ContactsService, 'create'>>;
  let sessionMock: any;

  // Builds a fake "lead document" that behaves like the mongoose document
  // convertIfFinalStage operates on: plain props + a `save` method that
  // resolves to the (already-mutated) object itself.
  function makeLead(overrides: Partial<any> = {}) {
    const lead: any = {
      _id: 'lead1',
      name: 'John Prospect',
      company: 'Acme Co',
      email: 'john@acme.test',
      phone: '555-1234',
      territory: 'APAC',
      notes: 'Looks promising',
      status: LeadStatus.NEW,
      source: LeadSource.WEBSITE,
      organizationId: undefined,
      contactId: undefined,
      convertedAt: undefined,
      ...overrides,
    };
    lead.save = jest.fn().mockImplementation(() => Promise.resolve(lead));
    return lead;
  }

  beforeEach(async () => {
    modelMock = jest.fn();
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    sessionMock = {
      withTransaction: jest.fn().mockImplementation(async (fn: () => Promise<void>) => {
        await fn();
      }),
      endSession: jest.fn().mockResolvedValue(undefined),
    };
    connectionMock = {
      startSession: jest.fn().mockResolvedValue(sessionMock),
    };

    organizationsServiceMock = {
      create: jest.fn().mockResolvedValue({ _id: 'org1' }),
    };
    contactsServiceMock = {
      create: jest.fn().mockResolvedValue({ _id: 'contact1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: getModelToken(Lead.name), useValue: modelMock },
        { provide: getConnectionToken(), useValue: connectionMock },
        { provide: OrganizationsService, useValue: organizationsServiceMock },
        { provide: ContactsService, useValue: contactsServiceMock },
        { provide: NotificationsService, useValue: { create: jest.fn().mockResolvedValue({}) } },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created lead when it does not reach the final stage', async () => {
      const lead = makeLead({ status: LeadStatus.NEW });
      modelMock.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(lead) }));

      const dto: CreateLeadDto = {
        name: lead.name,
        company: lead.company,
        email: lead.email,
      };
      const result = await service.create(dto);

      expect(result).toBe(lead);
      expect(organizationsServiceMock.create).not.toHaveBeenCalled();
      expect(contactsServiceMock.create).not.toHaveBeenCalled();
    });

    it('auto-converts a qualified lead with no organizationId into an organization + contact', async () => {
      const lead = makeLead({ status: LeadStatus.QUALIFIED, organizationId: undefined });
      modelMock.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(lead) }));

      const dto: CreateLeadDto = {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        status: LeadStatus.QUALIFIED,
      };
      const result = await service.create(dto);

      expect(connectionMock.startSession).toHaveBeenCalled();
      expect(sessionMock.withTransaction).toHaveBeenCalled();
      expect(organizationsServiceMock.create).toHaveBeenCalledTimes(1);
      expect(organizationsServiceMock.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: lead.company, phone: lead.phone }),
        sessionMock,
      );
      expect(contactsServiceMock.create).toHaveBeenCalledTimes(1);
      expect(contactsServiceMock.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: lead.name, email: lead.email, organizationId: 'org1' }),
        sessionMock,
      );

      expect(result.organizationId).toBe('org1');
      expect(result.contactId).toBe('contact1');
      expect(result.convertedAt).toBeInstanceOf(Date);
      expect(sessionMock.endSession).toHaveBeenCalled();
    });

    it('does not convert again when the lead already has an organizationId', async () => {
      const lead = makeLead({ status: LeadStatus.QUALIFIED, organizationId: 'existing-org' });
      modelMock.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(lead) }));

      const dto: CreateLeadDto = {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        status: LeadStatus.QUALIFIED,
      };
      const result = await service.create(dto);

      expect(connectionMock.startSession).not.toHaveBeenCalled();
      expect(organizationsServiceMock.create).not.toHaveBeenCalled();
      expect(contactsServiceMock.create).not.toHaveBeenCalled();
      expect(result.organizationId).toBe('existing-org');
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const lead = makeLead();
      const execFind = jest.fn().mockResolvedValue([lead]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: LeadsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [lead], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the lead when found', async () => {
      const lead = makeLead();
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(lead) });
      const result = await service.findOne('lead1');
      expect(modelMock.findById).toHaveBeenCalledWith('lead1');
      expect(result).toBe(lead);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated lead when it does not reach the final stage', async () => {
      const lead = makeLead({ status: LeadStatus.CONTACTED });
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(lead) });

      const result = await service.update('lead1', { status: LeadStatus.CONTACTED });

      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'lead1',
        { status: LeadStatus.CONTACTED },
        { new: true },
      );
      expect(result).toBe(lead);
      expect(organizationsServiceMock.create).not.toHaveBeenCalled();
    });

    it('auto-converts when the update brings the lead to the qualified stage', async () => {
      const lead = makeLead({ status: LeadStatus.QUALIFIED, organizationId: undefined });
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(lead) });

      const result = await service.update('lead1', { status: LeadStatus.QUALIFIED });

      expect(organizationsServiceMock.create).toHaveBeenCalledTimes(1);
      expect(contactsServiceMock.create).toHaveBeenCalledTimes(1);
      expect(result.organizationId).toBe('org1');
      expect(result.contactId).toBe('contact1');
      expect(result.convertedAt).toBeInstanceOf(Date);
    });

    it('does not convert again on update when the lead already has an organizationId', async () => {
      const lead = makeLead({ status: LeadStatus.QUALIFIED, organizationId: 'existing-org' });
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(lead) });

      const result = await service.update('lead1', { status: LeadStatus.QUALIFIED });

      expect(organizationsServiceMock.create).not.toHaveBeenCalled();
      expect(contactsServiceMock.create).not.toHaveBeenCalled();
      expect(result.organizationId).toBe('existing-org');
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted lead', async () => {
      const lead = makeLead();
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(lead) });
      const result = await service.remove('lead1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('lead1');
      expect(result).toBe(lead);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
