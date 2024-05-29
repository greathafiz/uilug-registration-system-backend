import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  skill_name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  trainer: number;

  @IsNotEmpty()
  @IsNumber()
  slots: number;
}
