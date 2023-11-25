import { UserStatus } from '../enums/user-status.enum'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm'
import { UserRole } from '../enums/user-role.enum'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ name: 'user_name', unique: true })
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  email: string

  @Column({ name: 'date_of_birth', nullable: true })
  dob: string

  @Column({ nullable: true })
  address: string

  @Column()
  phone: string

  @Column({ nullable: true })
  photo: string

  // system super admin
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean

  // @Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.User] })
  // roles: UserRole[]

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Seller })
  role: UserRole

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({name: 'updated_at', type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User of id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User of id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`User Removed`)
  }
}
