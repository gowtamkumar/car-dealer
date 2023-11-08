import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TodoStatusEnum } from '../enums'

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'enum', enum: TodoStatusEnum, default: TodoStatusEnum.Pending })
  status: TodoStatusEnum

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Todo with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Todo with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Todo with id ${this.id}`)
  }
}
