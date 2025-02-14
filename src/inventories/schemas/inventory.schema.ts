import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Host {
  @Prop({ required: true }) brand: string;
  @Prop({ required: true }) type: string;
  @Prop({ required: true }) series: string;
  @Prop({ required: true }) hostname: string;
  @Prop({ required: true }) host: string;
  @Prop({ required: true }) user: string;
  @Prop({ required: true }) connection: string;
  @Prop({ required: true }) port: string;
}

export const HostSchema = SchemaFactory.createForClass(Host);

@Schema()
export class Group {
  @Prop({ required: true }) group_name: string;
  @Prop({ type: [HostSchema], required: true }) hosts: Host[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);

@Schema()
export class Variable {
  @Prop({ required: true }) key: string;
  @Prop({ type: String || Number || Boolean, required: true }) 
  value: string | number | boolean;
}

export const VariableSchema = SchemaFactory.createForClass(Variable);

@Schema()
export class Environment {
  @Prop({ required: true }) environment_name: string;
  @Prop({ type: GroupSchema, required: true }) groups: Group;
  @Prop({ type: [VariableSchema], required: true }) variables: Variable[];
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true }) inventory_name: string;
  @Prop({ type: EnvironmentSchema, required: true }) environments: Environment;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);