import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { UserRole } from '../enums/user-role.enum'
import { UserStatus } from '../enums/user-status.enum'

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string

  @ApiProperty()
  @Expose()
  name: string

  @ApiProperty()
  @Expose()
  username: string

  @ApiProperty()
  @Expose()
  password: string

  @ApiProperty()
  @Expose()
  email: string

  @ApiProperty()
  @Expose()
  dob: string

  @ApiProperty()
  @Expose()
  address: string

  @ApiProperty()
  @Expose()
  phone: string

  @ApiProperty()
  @Expose()
  photo: string

  @ApiProperty()
  @Expose()
  isAdmin: boolean

  @ApiProperty()
  @Expose()
  role: UserRole

  @ApiProperty()
  @Expose()
  status: UserStatus
}
