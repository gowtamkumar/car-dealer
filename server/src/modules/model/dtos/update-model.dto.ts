import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUUID()
  brandId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
