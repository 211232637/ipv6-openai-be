import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PipelineDocument = HydratedDocument<Pipeline>;

@Schema()
export class PipelineItem {
  @Prop({ required: true }) inventory: string;
  @Prop({ required: true }) playbook: string;
}

export const PipelineItemSchema = SchemaFactory.createForClass(PipelineItem);

@Schema()
export class Cron {
  @Prop({ required: true }) minute: string;
  @Prop({ required: true }) hour: string;
  @Prop({ required: true }) dayOfMonth: string;
  @Prop({ required: true }) month: string;
  @Prop({ required: true }) dayOfWeek: string;
}

export const CronSchema = SchemaFactory.createForClass(Cron);

@Schema()
export class Stage {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) status: string;
}

export const StageSchema = SchemaFactory.createForClass(Stage);

@Schema({ timestamps: true })
export class Pipeline {
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) tag: string;
  @Prop({ required: true }) type: string;
  @Prop({ type: [StageSchema], required: true }) stages: Stage[];
  @Prop({ required: true }) duration: string;
  @Prop({ required: true }) version: string;
  @Prop({ required: true }) datetime: string;
  @Prop({ required: true }) status: string;
  @Prop({ type: [PipelineItemSchema], required: true }) pipeline: PipelineItem[];
  @Prop({ type: Object, required: false, default: null }) cron?: any;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);