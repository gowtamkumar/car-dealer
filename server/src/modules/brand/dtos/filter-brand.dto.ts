import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator'

export class FilterBrandDto {
  @IsString()
  name: string



  @IsBoolean()
  isActive: boolean

}
