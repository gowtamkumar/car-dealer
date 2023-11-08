import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DivisionEntity } from '../../division/entities/division.entity'
import { PostcodeEntity } from '../../postcode/entities/postcode.entity'
import { UpazilaEntity } from '../../upazila/entities/upazila.entity'

@Entity('districts')
export class DistrictEntity {
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

  @Column({ name: 'division_id' })
  divisionId: number
  @ManyToOne((_type) => DivisionEntity, (division) => division.districts)
  @JoinColumn({ name: 'division_id' })
  division: DivisionEntity

  // relations
  @OneToMany((_type) => UpazilaEntity, (upazila) => upazila.district)
  upazilas: UpazilaEntity[]

  @OneToMany((_type) => PostcodeEntity, (postcode) => postcode.district)
  postcodes: PostcodeEntity[]

  // @OneToMany((_type) => BranchEntity, (branch) => branch.district)
  // branches: BranchEntity[];
}
