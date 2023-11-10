import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { UserRole } from '../enums/user-role.enum'
import { UserStatus } from '../enums/user-status.enum'

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string


  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  username: string

  // @IsString()
  // @IsNotEmpty()
  // @Length(8, 20)
  // password: string

  @Transform(({ value }) => value || null)
  @IsEmail()
  @IsOptional()
  email: string

  @Transform(({ value }) => value || null)
  @IsDateString()
  @IsOptional()
  dob: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  address: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  phone: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  photo: string

  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[]

  @IsEnum(UserStatus)
  status: UserStatus
}
