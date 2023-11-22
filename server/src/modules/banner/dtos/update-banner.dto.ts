import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateBannerDto {
  @IsString()
  @IsNotEmpty()
  photo: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
