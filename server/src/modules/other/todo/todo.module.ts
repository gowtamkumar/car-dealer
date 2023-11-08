import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoController } from './controllers/todo.controller'
import { TodoEntity } from './entities/todo.entity'
import { TodoService } from './services/todo.service'

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
