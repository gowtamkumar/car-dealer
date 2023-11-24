import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class FilterModelCodeDto {
  @IsString()
  name: string

  @IsString()
  modelId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
