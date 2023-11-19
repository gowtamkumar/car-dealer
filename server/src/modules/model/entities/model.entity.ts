import { StatusEnum } from '@common/enums/status-enum'
import { BrandEntity } from '@modules/brand/entities/brand.entity'
import { ModelCodeEntity } from '@modules/model-code/entities/model-code.entity'
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

@Entity('models')
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ name: 'brand_id', type: 'uuid', nullable: true })
  brandId: string
  @JoinColumn({ name: 'brand_id' })
  @ManyToOne((_type) => BrandEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  brand: BrandEntity

  @Column({ type: 'enum', enum: StatusEnum, default: 'Active' })
  status: StatusEnum

  // relations

  @OneToMany(() => ModelCodeEntity, (modelCode) => modelCode.model)
  modelCodes: ModelCodeEntity[]

  

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Model with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Model with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Model`)
  }
}
