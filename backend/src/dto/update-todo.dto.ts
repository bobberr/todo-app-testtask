import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateTodoQueryDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}
