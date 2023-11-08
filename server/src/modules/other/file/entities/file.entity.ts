import { ProductEntity } from '@modules/product/entities/product.entity'
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  fieldname: string

  @Column({ nullable: true })
  originalname: string

  @Column({ nullable: true })
  encoding: string

  @Column({ nullable: true })
  mimetype: string

  @Column({ nullable: true })
  destination: string

  @Column({ nullable: true })
  filename: string

  @Column({ nullable: true })
  path: string

  @Column({ nullable: true })
  size: number

  @Column({ name: 'is_active', default: false })
  isActive: boolean

  @Column({ name: 'product_id', type: 'uuid', nullable: true })
  productId: string
  @ManyToOne((_type) => ProductEntity, (product) => product.files, { onDelete: 'CASCADE' })
  product: ProductEntity

  // Relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted File with id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated File with id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed File`)
  }
}
