import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DistrictEntity } from '../../district/entities/district.entity'
import { ProductEntity } from '@modules/product/entities/product.entity'

@Entity('upazilas')
export class UpazilaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true, nullable: true })
  code: string

  @Column()
  name: string

  @Column({ name: 'bn_name' })
  bnName: string

  @Column({ nullable: true })
  url: string

  @Column({ type: 'numeric', nullable: true })
  lat: number

  @Column({ type: 'numeric', nullable: true })
  lng: number

  @Column({ name: 'district_id' })
  districtId: number
  @ManyToOne((_type) => DistrictEntity, (district) => district.upazilas)
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity

  // relations

  @OneToMany((_type) => ProductEntity, (product) => product.upazila)
  products: ProductEntity[]
}
