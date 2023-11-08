import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DistrictEntity } from '../../district/entities/district.entity'
import { DivisionEntity } from '../../division/entities/division.entity'
import { UnionEntity } from '../../union/entities/union.entity'
import { UpazilaEntity } from '../../upazila/entities/upazila.entity'

@Entity('postcodes')
export class PostcodeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'post_code', unique: true })
  postCode: string

  @Column({ name: 'post_office' })
  postOffice: string

  @Column({ name: 'sub_offices', type: 'simple-array', nullable: true })
  subOffices: string[]

  @Column({ name: 'division_id', nullable: true })
  divisionId: number
  @ManyToOne((_type) => DivisionEntity, (division) => division.postcodes)
  @JoinColumn({ name: 'division_id' })
  division: DivisionEntity

  @Column({ name: 'district_id', nullable: true })
  districtId: number
  @ManyToOne((_type) => DistrictEntity, (district) => district.postcodes)
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity

  @Column({ name: 'upazila_id', nullable: true })
  upazilaId: number
  @ManyToOne((_type) => UpazilaEntity, (upazila) => upazila.postcodes)
  @JoinColumn({ name: 'upazila_id' })
  upazila: UpazilaEntity

  @Column({ name: 'union_id', nullable: true })
  unionId: number
  @ManyToOne((_type) => UnionEntity, (union) => union.postcodes)
  @JoinColumn({ name: 'union_id' })
  union: UnionEntity

  @Column({ name: 'upazila_name', nullable: true })
  upazilaName: string

  @Column({ type: 'numeric', nullable: true })
  lat: number

  @Column({ type: 'numeric', nullable: true })
  lng: number
}
