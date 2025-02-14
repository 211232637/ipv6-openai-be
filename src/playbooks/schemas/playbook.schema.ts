import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaybookDocument = Playbook & Document;

@Schema({ timestamps: true })
export class Playbook {
  @Prop({ required: true })
  playbook: string;

  @Prop({ required: true })
  playbook_name: string;
}

export const PlaybookSchema = SchemaFactory.createForClass(Playbook);