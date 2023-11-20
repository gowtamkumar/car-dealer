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
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm'
import { BrandEntity } from '@modules/brand/entities/brand.entity'
import {
  BodyTypeEnum,
  ColorEnum,
  ConditionEnum,
  DrivetrainEnum,
  FuelTypeEnum,
  ProductStatusEnum,
  SteeringEnum,
  TransmissionEnum,
} from '../enums'
import { UserEntity } from '@admin/user/entities/user.entity'
import { DistrictEntity } from '@modules/other/bd-location/district/entities/district.entity'
import { DivisionEntity } from '@modules/other/bd-location/division/entities/division.entity'
import { UpazilaEntity } from '@modules/other/bd-location/upazila/entities/upazila.entity'
import { ProductFeatureEntity } from '@modules/product-feature/entities/product-feature.entity'
import { ModelEntity } from '@modules/model/entities/model.entity'
import { ModelCodeEntity } from '@modules/model-code/entities/model-code.entity'
import { ReviewEntity } from '@modules/review/entities/review.entity'
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'enum', enum: ConditionEnum })
  condition: ConditionEnum

  @Column({ type: 'boolean', nullable: true })
  auction: boolean

  @Column({ name: 'brand_id', type: 'uuid' })
  brandId: string
  @JoinColumn({ name: 'brand_id' })
  @ManyToOne((_type) => BrandEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  brand: BrandEntity

  @Column({ name: 'model_id', type: 'uuid' })
  modelId: string
  @JoinColumn({ name: 'model_id' })
  @ManyToOne((_type) => ModelEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  model: ModelEntity

  @Column({ name: 'model_code_id', type: 'uuid' })
  modelCodeId: string
  @JoinColumn({ name: 'model_code_id' })
  @ManyToOne((_type) => ModelCodeEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  modelCode: ModelCodeEntity

  @Column({ nullable: true })
  edition: string

  @Column({ name: 'manufacture_date', nullable: true })
  manufactureDate: string

  @Column({ name: 'registration_date', nullable: true })
  registrationDate: string

  @Column({ name: 'fuel_type', type: 'enum', enum: FuelTypeEnum })
  fuelType: FuelTypeEnum

  @Column({ type: 'enum', enum: TransmissionEnum })
  transmission: TransmissionEnum

  @Column({ name: 'body_type', type: 'enum', enum: BodyTypeEnum })
  bodyType: BodyTypeEnum

  @Column({ type: 'enum', enum: SteeringEnum })
  steering: SteeringEnum

  @Column({ type: 'enum', enum: ColorEnum })
  color: ColorEnum

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  price: number

  @Column({ name: 'no_of_pass' })
  noOfPass: number

  @Column()
  milleage: number

  @Column({ name: 'load_capacity', nullable: true })
  loadCapacity: string

  @Column({ name: 'eng_cc', nullable: true })
  engCc: number

  @Column({ name: 'eng_code', nullable: true })
  engCode: string

  @Column({ name: 'no_of_seat' })
  noOfseat: number

  @Column({ name: 'no_of_owner' })
  noOfOwner: number

  @Column({ type: 'enum', enum: DrivetrainEnum })
  drivetrain: DrivetrainEnum

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'simple-array', nullable: true })
  photos: string[]

  @Column({ name: 'division_id' })
  divisionId: number
  @JoinColumn({ name: 'division_id' })
  @ManyToOne((_type) => DivisionEntity, (division) => division.products, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  division: DivisionEntity

  @Column({ name: 'district_id' })
  districtId: number
  @JoinColumn({ name: 'district_id' })
  @ManyToOne((_type) => DistrictEntity, (district) => district.products, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  district: DistrictEntity

  @Column({ name: 'upazila_id' })
  upazilaId: number
  @JoinColumn({ name: 'upazila_id' })
  @ManyToOne((_type) => UpazilaEntity, (upazila) => upazila.products, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  upazila: UpazilaEntity

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string
  @JoinColumn({ name: 'user_id' })
  @ManyToOne((_type) => UserEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @Column({ type: 'enum', enum: ProductStatusEnum, default: ProductStatusEnum.Pending })
  status: ProductStatusEnum

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  // relations
  @OneToMany(() => FileEntity, (file) => file.product)
  files: FileEntity[]

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[]

  @OneToOne(() => ProductFeatureEntity, (productFeature) => productFeature.product)
  productFeature: ProductFeatureEntity

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
