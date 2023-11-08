import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PostcodeEntity } from '../../postcode/entities/postcode.entity'
import { UpazilaEntity } from '../../upazila/entities/upazila.entity'

@Entity('unions')
export class UnionEntity {
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

  @Column({ name: 'upazila_id' })
  upazilaId: number
  @ManyToOne((_type) => UpazilaEntity, (upazila) => upazila.unions)
  @JoinColumn({ name: 'upazila_id' })
  upazila: UpazilaEntity

  // relations
  @OneToMany((_type) => PostcodeEntity, (postcodes) => postcodes.union)
  postcodes: PostcodeEntity[]
}
