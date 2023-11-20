import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DistrictEntity } from '../../district/entities/district.entity'
import { ProductEntity } from '@modules/product/entities/product.entity'

@Entity('divisions')
export class DivisionEntity {
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

  // relations
  @OneToMany((_type) => DistrictEntity, (district) => district.division)
  districts: DistrictEntity[]

  @OneToMany((_type) => ProductEntity, (product) => product.division)
  products: ProductEntity[]
}
