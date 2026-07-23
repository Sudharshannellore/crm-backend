import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { MeetingsService } from './meetings.service';
import { Meeting } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingsQueryDto } from './dto/meetings-query.dto';

describe('MeetingsService', () => {
  let service: MeetingsService;
  let modelMock: any;

  const savedMeeting = { _id: 'meeting1', title: 'Kickoff', date: new Date(), time: '10:00' };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'meeting1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingsService, { provide: getModelToken(Meeting.name), useValue: modelMock }],
    }).compile();

    service = module.get<MeetingsService>(MeetingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created meeting', async () => {
      const dto: CreateMeetingDto = { title: 'Kickoff', date: new Date(), time: '10:00' };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'meeting1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedMeeting]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: MeetingsQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedMeeting], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    it('returns the meeting when found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(savedMeeting) });
      const result = await service.findOne('meeting1');
      expect(modelMock.findById).toHaveBeenCalledWith('meeting1');
      expect(result).toEqual(savedMeeting);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated meeting', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedMeeting),
      });
      const result = await service.update('meeting1', { title: 'New Title' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'meeting1',
        { title: 'New Title' },
        { new: true },
      );
      expect(result).toEqual(savedMeeting);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('returns the deleted meeting', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedMeeting),
      });
      const result = await service.remove('meeting1');
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith('meeting1');
      expect(result).toEqual(savedMeeting);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
