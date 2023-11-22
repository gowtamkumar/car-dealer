import { StatusEnum } from '@common/enums/status-enum'
import { ModelEntity } from '@modules/model/entities/model.entity'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  // relations
  @OneToMany(() => ModelEntity, (model) => model.brand)
  models: ModelEntity[]

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
