import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class FilterModelDto {
  @IsString()
  name: string

  @IsString()
  brandId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

}
