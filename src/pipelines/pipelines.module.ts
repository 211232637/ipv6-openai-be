import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { Pipeline, PipelineSchema } from './schemas/pipeline.schema';
import { SystemStatesModule } from '../system-states/system-states.module';
import { PlaybooksModule } from 'src/playbooks/playbooks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pipeline.name, schema: PipelineSchema }]),
    SystemStatesModule,
    PlaybooksModule,
  ],
  controllers: [PipelinesController],
  providers: [PipelinesService],
})
export class PipelinesModule {}