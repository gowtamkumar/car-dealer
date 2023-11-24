import { StatusEnum } from '@common/enums/status-enum'
import { BrandEntity } from '@modules/brand/entities/brand.entity'
import { ModelEntity } from '@modules/model/entities/model.entity'
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

@Entity('model_codes')
export class ModelCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ name: 'model_id', type: 'uuid', nullable: true })
  modelId: string
  @JoinColumn({ name: 'model_id' })
  @ManyToOne((_type) => ModelEntity, (model)=> model.modelCodes, {
    onUpdate: 'CASCADE',
  })
  model: ModelEntity

  @Column({ type: 'boolean', default: true })
  isActive: boolean
  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted ModelCode with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated ModelCode with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed ModelCode`)
  }
}
