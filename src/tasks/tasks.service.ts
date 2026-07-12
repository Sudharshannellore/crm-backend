import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}
  create(createTaskDto: CreateTaskDto) {
    const created = new this.taskModel(createTaskDto);
    return created.save();
  }

  findAll() {
    return this.taskModel.find().exec();
  }

  findOne(id: number) {
    return this.taskModel.findById(id).exec();
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
