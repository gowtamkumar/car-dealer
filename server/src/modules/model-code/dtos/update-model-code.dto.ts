import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateModelCodeDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUUID()
  modelId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

}
