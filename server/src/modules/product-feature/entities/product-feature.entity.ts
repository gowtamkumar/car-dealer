import { ProductEntity } from '@modules/product/entities/product.entity'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('product_features')
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string


  @Column({ name: 'product_id', type: 'uuid' })
  productId: string
  @JoinColumn({ name: 'product_id' })
  @OneToOne((_type) => ProductEntity,(product)=> product.productFeature, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity

  @Column({ name: 'cd_player', type: 'boolean', nullable: true })
  cdPlayer: boolean

  @Column({ name: 'sun_roof', type: 'boolean', nullable: true })
  sunRoof: boolean

  @Column({ name: 'alloy_wheels', type: 'boolean', nullable: true })
  alloyWheels: boolean

  @Column({ name: 'power_steering', type: 'boolean', nullable: true })
  powerSteering: boolean

  @Column({ name: 'power_window', type: 'boolean', nullable: true })
  powerWindow: boolean

  @Column({ type: 'boolean', nullable: true })
  ac: boolean

  @Column({ type: 'boolean', nullable: true })
  abs: boolean

  @Column({ name: 'air_bag', type: 'boolean', nullable: true })
  airBag: boolean

  @Column({ type: 'boolean', nullable: true })
  radio: boolean

  @Column({ name: 'cd_changer', type: 'boolean', nullable: true })
  cdChanger: boolean

  @Column({ type: 'boolean', nullable: true })
  dvd: boolean

  @Column({ type: 'boolean', nullable: true })
  tv: boolean

  @Column({ name: 'power_seat', type: 'boolean', nullable: true })
  powerSeat: boolean

  @Column({ name: 'back_tire', type: 'boolean', nullable: true })
  backTire: boolean

  @Column({ name: 'grill_guard', type: 'boolean', nullable: true })
  grillGuard: boolean

  @Column({ name: 'rear_spoiler', type: 'boolean', nullable: true })
  rearSpoiler: boolean

  @Column({ name: 'center_locking', type: 'boolean', nullable: true })
  centerLocking: boolean

  @Column({ type: 'boolean', nullable: true })
  jack: boolean

  @Column({ name: 'spare_tire', type: 'boolean', nullable: true })
  spareTire: boolean

  @Column({ name: 'wheel_spanner', type: 'boolean', nullable: true })
  wheelSpanner: boolean

  @Column({ name: 'fog_light', type: 'boolean', nullable: true })
  fogLight: boolean

  @Column({ name: 'back_camera', type: 'boolean', nullable: true })
  backCamera: boolean

  @Column({ name: 'push_start', type: 'boolean', nullable: true })
  pushStart: boolean

  @Column({ name: 'key_lessentry', type: 'boolean', nullable: true })
  keyLessentry: boolean

  @Column({ type: 'boolean', nullable: true })
  esc: boolean

  @Column({ name: 'camera_360d', type: 'boolean', nullable: true })
  camera360d: boolean

  @Column({ name: 'body_kit', type: 'boolean', nullable: true })
  bodyKit: boolean

  @Column({ name: 'side_airbag', type: 'boolean', nullable: true })
  sideAirbag: boolean

  @Column({ name: 'power_mirror', type: 'boolean', nullable: true })
  powerMirror: boolean

  @Column({ name: 'side_skirts', type: 'boolean', nullable: true })
  sideSkirts: boolean

  @Column({ name: 'font_lip_spoiler', type: 'boolean', nullable: true })
  fontLipSpoiler: boolean

  @Column({ type: 'boolean', nullable: true })
  navigation: boolean

  @Column({ name: 'turbo', type: 'boolean', nullable: true })
  turbo: boolean

  @Column({ name: 'non_smoker', type: 'boolean', nullable: true })
  nonSmoker: boolean


  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Product Feature with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Product Feature with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Product Feature`)
  }
}
