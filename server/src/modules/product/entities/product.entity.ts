import { StatusEnum } from '@common/enums/status-enum'
import { FileEntity } from '@modules/other/file/entities/file.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { TaxEnum } from '../enums/tax.enum'
import { BrandEntity } from '@modules/brand/entities/brand.entity'
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  code: string

  @Column({ name: 'qty_alert', type: 'numeric', nullable: true })
  qtyAlert: number

  @Column({ name: 'brand_id', type: 'uuid', nullable: true })
  brandId: string
  @JoinColumn({ name: 'brand_id' })
  @ManyToOne((_type) => BrandEntity, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  brand: BrandEntity

  @Column({ name: 'barcode_symbology', nullable: true })
  barcodeSymbology: string

  @Column({ name: 'item_barcode', nullable: true })
  itemBarcode: string

  @Column({ name: 'purchase_price', type: 'numeric', precision: 9, scale: 2, nullable: true })
  purchasePrice: number

  @Column({ name: 'purchase_tax', type: 'enum', enum: TaxEnum, nullable: true })
  purchaseTax: TaxEnum

  @Column({ name: 'sale_price', type: 'numeric', precision: 9, scale: 2, nullable: true })
  salePrice: number

  @Column({ name: 'sale_tax', type: 'enum', enum: TaxEnum, nullable: true })
  saleTax: TaxEnum

  @Column({ type: 'numeric', precision: 9, scale: 2, nullable: true })
  mrp: number

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ nullable: true })
  photo: string

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.Active })
  status: StatusEnum

  // relations

  @OneToMany(() => FileEntity, (file) => file.product, { eager: true })
  files: FileEntity[]

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Product of id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Product of id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Product Removed`)
  }
}
