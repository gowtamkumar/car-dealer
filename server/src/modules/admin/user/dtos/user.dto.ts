import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { UserRole } from '../enums/user-role.enum'
import { UserStatus } from '../enums/user-status.enum'

export class UserDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  username: string

  @Expose()
  password: string

  @Expose()
  email: string

  @Expose()
  dob: string

  @Expose()
  address: string

  @Expose()
  phone: string

  @Expose()
  photo: string

  // system super admin
  @Expose()
  isAdmin: boolean

  @Expose()
  roles: UserRole[]

  @Expose()
  status: UserStatus
}
