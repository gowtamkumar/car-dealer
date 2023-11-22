import { StatusEnum } from '@common/enums/status-enum'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('banners')
export class BannerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string
  
  @Column()
  image: string


  @Column({ type: 'enum', enum: StatusEnum, default: 'Active' })
  status: StatusEnum

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Banner with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Banner with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Banner`)
  }
}
