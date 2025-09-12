import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteTodoQueryDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
