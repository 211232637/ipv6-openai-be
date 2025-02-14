import { Query, Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';

@Controller('api/pipelines')
export class PipelinesController {
  constructor(private readonly pipelinesService: PipelinesService) {}

  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.pipelinesService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelinesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePipelineDto: CreatePipelineDto) {
    return this.pipelinesService.update(id, updatePipelineDto);
  }

  @Patch(':id/stop')
  async stopPipeline(@Param('id') pipelineId: string) {
    return this.pipelinesService.stopPipeline(pipelineId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelinesService.remove(id);
  }
}