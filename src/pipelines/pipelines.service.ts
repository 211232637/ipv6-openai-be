import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pipeline, PipelineDocument } from './schemas/pipeline.schema';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { SystemStatesService } from '../system-states/system-states.service';
import { PlaybooksService } from 'src/playbooks/playbooks.service';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectModel(Pipeline.name) private pipelineModel: Model<PipelineDocument>,
    private readonly systemStatesService: SystemStatesService,
    private readonly playbooksService: PlaybooksService,
  ) {}

  async create(createPipelineDto: CreatePipelineDto): Promise<Pipeline> {
    const systemState = await this.systemStatesService.getState();
    const newVersion = this.systemStatesService.incrementVersion(systemState.lastVersion);
    const newTag = this.systemStatesService.incrementTag(systemState.lastTag);
    await this.systemStatesService.updateState(newVersion, newTag);

    const playbookNames = await Promise.all(
      createPipelineDto.pipeline.map(async (item) => {
        const playbook = await this.playbooksService.findOne(item.playbook);
        return playbook.playbook_name;
      })
    );

    const description = `Running ${playbookNames.join(', ')}`;
    const stages = playbookNames.map((name) => ({ name, status: 'running' }));

    const newPipeline = new this.pipelineModel({
      ...createPipelineDto,
      version: newVersion,
      tag: newTag,
      stages,
      status: "running",
      duration: "00:00:00",
      description: description,
    });

    return newPipeline.save();
  }

  async findAll(page = 1, limit = 10, search = ''): Promise<{ data: Pipeline[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = search ? { description: { $regex: search, $options: 'i' } } : {};
    const data = await this.pipelineModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  
    const total = await this.pipelineModel.countDocuments(query).exec();
    return { data, total };
  }

  async findOne(id: string): Promise<Pipeline> {
    const pipeline = await this.pipelineModel.findById(id).exec();
    if (!pipeline) throw new NotFoundException('Pipeline not found');
    return pipeline;
  }

  async update(id: string, updatePipelineDto: CreatePipelineDto): Promise<Pipeline> {
    const updatedPipeline = await this.pipelineModel
      .findByIdAndUpdate(id, updatePipelineDto, { new: true })
      .exec();
    if (!updatedPipeline) throw new NotFoundException('Pipeline not found');
    return updatedPipeline;
  }

  async stopPipeline(pipelineId: string): Promise<Pipeline> {
    const pipeline = await this.pipelineModel.findById(pipelineId).exec();
    if (!pipeline) throw new NotFoundException(`Pipeline with ID ${pipelineId} not found`);
  
    pipeline.status = "stopped";
    pipeline.stages = pipeline.stages.map(stage => ({ ...stage, status: "stopped" }));
  
    return pipeline.save();
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.pipelineModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Pipeline not found');
    return { message: 'Pipeline deleted successfully' };
  }
}