import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository, PrismaService],
  exports: [TodosService],
})
export class TodosModule {}
