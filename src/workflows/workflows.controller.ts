import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsQueryDto } from './dto/workflows-query.dto';
import { ExecuteWorkflowDto } from './dto/execute-workflow.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll(@Query() query: WorkflowsQueryDto) {
    return this.workflowsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowsService.update(id, updateWorkflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(id);
  }

  @Get(':id/runs')
  findRuns(@Param('id') id: string, @Query() query: PaginationQueryDto) {
    return this.workflowsService.findRuns(id, query);
  }

  @Delete(':id/runs')
  clearRuns(@Param('id') id: string) {
    return this.workflowsService.clearRuns(id);
  }

  @Post(':id/execute')
  execute(@Param('id') id: string, @Body() executeWorkflowDto: ExecuteWorkflowDto) {
    return this.workflowsService.execute(id, executeWorkflowDto?.triggerPayload);
  }
}
