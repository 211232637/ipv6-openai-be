import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SystemStateDocument = HydratedDocument<SystemState>;

@Schema({ timestamps: true }) // Auto-creates createdAt & updatedAt fields
export class SystemState {
  @Prop({ required: true, default: '0.0.0' })
  lastVersion: string;

  @Prop({ required: true, default: '#0000' })
  lastTag: string;
}

export const SystemStateSchema = SchemaFactory.createForClass(SystemState);