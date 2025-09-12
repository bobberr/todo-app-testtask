import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTodoQueryDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
