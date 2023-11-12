import { StatusEnum } from '@common/enums/status-enum'
import { BrandEntity } from '@modules/brand/entities/brand.entity'
import { ProductEntity } from '@modules/product/entities/product.entity'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReivewStatusEnum } from '../enums/review-status-enum'
import { UserEntity } from '@admin/user/entities/user.entity'

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string
  @JoinColumn({ name: 'product_id' })
  @ManyToOne((_type) => ProductEntity, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity

  @Column()
  rating: string

  @Column()
  description: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string
  @JoinColumn({ name: 'user_id' })
  @ManyToOne((_type) => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @Column({ type: 'enum', enum: ReivewStatusEnum, default: ReivewStatusEnum.Pending })
  status: ReivewStatusEnum

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Review with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Review with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Review`)
  }
}
