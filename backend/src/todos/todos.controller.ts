import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { DeleteTodoQueryDto } from 'src/dto/delete-todo.dto';
import { UpdateTodoDto, UpdateTodoQueryDto } from 'src/dto/update-todo.dto';
import { GetTodoQueryDto } from 'src/dto/get-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getAll();
  }

  @Get(':id')
  getTodo(@Param() params: GetTodoQueryDto) {
    return this.todosService.getById(params.id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  updateTodo(@Body() dto: UpdateTodoDto, @Param() params: UpdateTodoQueryDto) {
    return this.todosService.update(params.id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param() params: DeleteTodoQueryDto) {
    return this.todosService.delete(params.id);
  }
}
