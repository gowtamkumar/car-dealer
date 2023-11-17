import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('settings')
export class SettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'company_name' })
  companyName: string

  @Column({ name: 'full_address' })
  fullAddress: string

  @Column()
  phone: string

  @Column({ nullable: true })
  logo: string

  @Column({ name: 'support_phone', nullable: true })
  supportPhone: string

  @Column({ nullable: true })
  email: string

  @Column({ name: 'facebook_url', nullable: true })
  facebookUrl: string

  @Column({ name: 'youtube_url', nullable: true })
  youtubeUrl: string

  @Column({ nullable: true })
  twitter: string

  @Column({ nullable: true })
  instagram: string

  // relations

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Setting with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Setting with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Setting`)
  }
}
