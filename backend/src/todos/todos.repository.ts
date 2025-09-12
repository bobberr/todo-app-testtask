import { Injectable } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.todo.findMany();
  }

  async getById(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async create(title: string, comment?: string) {
    return this.prisma.todo.create({ data: { title, comment } });
  }

  async update(
    id: number,
    data: { title?: string; comment?: string; isDone?: boolean },
  ) {
    return this.prisma.todo.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
