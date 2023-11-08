import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from '../dtos'
import { TodoEntity } from '../entities/todo.entity'
import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Repository } from 'typeorm'
import { TodoRepository } from '../repositories/todo.repository'

@Injectable()
export class TodoService {
  private logger = new Logger(TodoService.name)

  constructor(
    private readonly todoRepo: TodoRepository,
  ) {}

  getTodos(ctx: RequestContextDto, filterTodoDto: FilterTodoDto): Promise<TodoEntity[]> {
    this.logger.log(`${this.getTodos.name} Service Called`)

    return this.todoRepo.find()
  }

  async getTodo(ctx: RequestContextDto, id: string): Promise<TodoEntity> {
    this.logger.log(`${this.getTodo.name} Service Called`)

    const result = await this.todoRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Todo of id ${id} not found.`)
    }
    return result
  }

  async createTodo(ctx: RequestContextDto, createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    this.logger.log(`${this.createTodo.name} Service Called`)

    const result = this.todoRepo.create(createTodoDto)
    return this.todoRepo.save(result)
  }

  async updateTodo(
    ctx: RequestContextDto,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    this.logger.log(`${this.updateTodo.name} Service Called`)

    const result = await this.todoRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Todo of id ${id} not found.`)
    }

    this.todoRepo.merge(result, updateTodoDto)
    return await this.todoRepo.save(result)
  }

  async deleteTodo(ctx: RequestContextDto, id: string): Promise<TodoEntity> {
    this.logger.log(`${this.deleteTodo.name} Service Called`)

    const result = await this.todoRepo.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(`Todo of id ${id} not found.`)
    }

    return this.todoRepo.remove(result)
  }
}
