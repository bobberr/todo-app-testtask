import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodosRepository } from './todos.repository';
import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getAll() {
    return this.todosRepository.getAll();
  }

  async getById(id: number) {
    return this.todosRepository.getById(id);
  }

  async create(dto: CreateTodoDto) {
    const { title, comment } = dto;
    return this.todosRepository.create(title, comment);
  }

  async update(id: number, dto: UpdateTodoDto) {
    return this.todosRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.todosRepository.delete(id);
  }
}
