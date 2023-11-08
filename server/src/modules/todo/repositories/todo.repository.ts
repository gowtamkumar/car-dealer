import { TodoEntity } from '../entities/todo.entity'
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager())
  }

  findAll() {
    return this.find()
  }
}
