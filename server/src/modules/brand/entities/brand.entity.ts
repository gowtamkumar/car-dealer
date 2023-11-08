import { StatusEnum } from '@common/enums/status-enum'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  logo: string

  @Column({ type: 'enum', enum: StatusEnum, default: 'Active' })
  status: StatusEnum

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Brand with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Brand with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Brand`)
  }
}
