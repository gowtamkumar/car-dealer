import { RequestContextDto } from '@common/dtos/request-context.dto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTodoDto, FilterTodoDto, UpdateTodoDto } from '../dtos'
import { TodoEntity } from '../entities/todo.entity'

@Injectable()
export class TodoService {
  private logger = new Logger(TodoService.name)

  constructor(@InjectRepository(TodoEntity) private readonly todoRepo: Repository<TodoEntity>) {}

  getTodos(ctx: RequestContextDto, filterTodoDto: FilterTodoDto): Promise<TodoEntity[]> {
    this.logger.log(`${this.getTodos.name} Called`)

    const { type, title } = filterTodoDto

    const reqQuery: any = {}

    if (type) reqQuery.type = type
    if (title) reqQuery.title = title

    return this.todoRepo.find({ where: reqQuery })
  }

  async getTodo(ctx: RequestContextDto, id: string): Promise<TodoEntity> {
    this.logger.log(`${this.getTodo.name} Called`)

    const todo = await this.todoRepo.findOne({ where: { id } })
    if (!todo) {
      throw new NotFoundException(`Todo of id ${id} not found`)
    }

    return todo
  }

  async createTodo(ctx: RequestContextDto, createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    this.logger.log(`${this.createTodo.name} Called`)

    const todo = await this.todoRepo.create(createTodoDto)
    await this.todoRepo.save(todo)

    return todo
  }

  async updateTodo(
    ctx: RequestContextDto,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    this.logger.log(`${this.updateTodo.name} Called`)

    const todo = await this.getTodo(ctx, id)

    this.todoRepo.merge(todo, updateTodoDto)
    await this.todoRepo.save(todo)

    return todo
  }

  async deleteTodo(ctx: RequestContextDto, id: string): Promise<TodoEntity> {
    this.logger.log(`${this.deleteTodo.name} Called`)

    const todo = await this.getTodo(ctx, id)
    await this.todoRepo.remove(todo)

    return todo
  }
}
