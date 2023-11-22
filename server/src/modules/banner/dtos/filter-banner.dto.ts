import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'

export class FilterBannerDto {
  
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
