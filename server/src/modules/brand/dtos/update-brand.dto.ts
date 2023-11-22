import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  logo: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
