import { IsNotEmpty, IsString, IsArray, ValidateNested, IsObject, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class PipelineItemDto {
  @IsNotEmpty()
  @IsString()
  inventory: string;

  @IsNotEmpty()
  @IsString()
  playbook: string;
}

export class CronDto {
  @IsNotEmpty()
  @IsString()
  minute: string;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsString()
  dayOfMonth: string;

  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNotEmpty()
  @IsString()
  dayOfWeek: string;
}

export class CreatePipelineDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @ValidateIf((o) => o.type !== 'Recurrent')
  @IsNotEmpty({ message: 'datetime is required when type is not Recurrent' })
  @IsString()
  datetime: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PipelineItemDto)
  pipeline: PipelineItemDto[];

  @ValidateIf((o) => o.type === 'Recurrent')
  @IsNotEmpty({ message: 'cron is required when type is Recurrent' })
  @IsObject()
  @ValidateNested()
  @Type(() => CronDto)
  cron: CronDto;
}