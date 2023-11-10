import { StatusEnum } from '@common/enums/status-enum'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'enum', enum: StatusEnum, default: 'Active' })
  status: StatusEnum

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
    console.log(`Removed Todo`)
  }
}
