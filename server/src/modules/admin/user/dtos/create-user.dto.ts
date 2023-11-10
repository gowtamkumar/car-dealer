import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { UserRole } from '../enums/user-role.enum'
import { UserStatus } from '../enums/user-status.enum'

export class CreateUserDto {
  @ApiProperty({ example: 'Biprodas Roy' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @ApiProperty({ example: 'biprodas' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @IsDefined()
  username: string

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @IsDefined()
  password: string

  @ApiProperty({ required: false, example: 'biprodas.ry@gmail.com' })
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

  @ApiProperty({ required: false, example: [UserRole.Admin] })
  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[]
}
