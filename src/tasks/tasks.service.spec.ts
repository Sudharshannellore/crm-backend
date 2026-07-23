import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { NotificationsService } from '../notifications/notifications.service';

describe('TasksService', () => {
  let service: TasksService;
  let modelMock: any;

  const savedTask = { _id: 'task1', title: 'Follow up' };

  beforeEach(async () => {
    modelMock = jest.fn().mockImplementation((dto: any) => ({
      ...dto,
      save: jest.fn().mockResolvedValue({ ...dto, _id: 'task1' }),
    }));
    modelMock.find = jest.fn();
    modelMock.findById = jest.fn();
    modelMock.findByIdAndUpdate = jest.fn();
    modelMock.findByIdAndDelete = jest.fn();
    modelMock.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task.name), useValue: modelMock },
        { provide: NotificationsService, useValue: { create: jest.fn().mockResolvedValue({}) } },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created task', async () => {
      const dto: CreateTaskDto = { title: 'Follow up' };
      const result = await service.create(dto);
      expect(modelMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...dto, _id: 'task1' });
    });
  });

  describe('findAll', () => {
    it('paginates using the model', async () => {
      const execFind = jest.fn().mockResolvedValue([savedTask]);
      const sort = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: execFind }),
        }),
      });
      modelMock.find.mockReturnValue({ sort });
      modelMock.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

      const query: TasksQueryDto = {};
      const result = await service.findAll(query);

      expect(modelMock.find).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: [savedTask], total: 1, page: 1, limit: 20 });
    });
  });

  describe('findOne', () => {
    // Regression guard: the controller used to coerce the id with `+id`
    // before calling findOne, which broke lookups for real Mongo ObjectId
    // strings (they aren't numeric). The service must receive and pass
    // through the raw string id, untouched.
    it('calls findById with the raw string id (no numeric coercion)', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(savedTask) });
      const id = '507f1f77bcf86cd799439011';
      const result = await service.findOne(id);
      expect(modelMock.findById).toHaveBeenCalledWith(id);
      expect(typeof modelMock.findById.mock.calls[0][0]).toBe('string');
      expect(result).toEqual(savedTask);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('calls findByIdAndUpdate with the raw string id (no numeric coercion)', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedTask),
      });
      const id = '507f1f77bcf86cd799439011';
      const result = await service.update(id, { title: 'New Title' });
      expect(modelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        { title: 'New Title' },
        { new: true },
      );
      expect(typeof modelMock.findByIdAndUpdate.mock.calls[0][0]).toBe('string');
      expect(result).toEqual(savedTask);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.update('missing', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('calls findByIdAndDelete with the raw string id (no numeric coercion)', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(savedTask),
      });
      const id = '507f1f77bcf86cd799439011';
      const result = await service.remove(id);
      expect(modelMock.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(typeof modelMock.findByIdAndDelete.mock.calls[0][0]).toBe('string');
      expect(result).toEqual(savedTask);
    });

    it('throws NotFoundException when not found', async () => {
      modelMock.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
