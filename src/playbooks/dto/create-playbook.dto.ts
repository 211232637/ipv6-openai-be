import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaybookDto {
  @IsNotEmpty()
  @IsString()
  playbook: string;

  @IsNotEmpty()
  @IsString()
  playbook_name: string;
}