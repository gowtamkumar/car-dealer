import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator'

// const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export class UpdatePasswordDto {

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsAlphanumeric()
  currentPassword: string

  @ApiProperty({ example: '1234567' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(8, 20)
  newPassword: string
}
