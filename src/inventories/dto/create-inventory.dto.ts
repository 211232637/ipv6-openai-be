import { IsNotEmpty, IsString, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class VariableDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: string | number | boolean;
}

export class HostDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  series: string;

  @IsNotEmpty()
  @IsString()
  hostname: string;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  connection: string;

  @IsNotEmpty()
  @IsString()
  port: string;
}

export class GroupDto {
  @IsNotEmpty()
  @IsString()
  group_name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HostDto)
  hosts: HostDto[];
}

export class EnvironmentDto {
  @IsNotEmpty()
  @IsString()
  environment_name: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => GroupDto)
  groups: GroupDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariableDto)
  variables: VariableDto[] = [];
}

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  inventory_name: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => EnvironmentDto)
  environments: EnvironmentDto;
}