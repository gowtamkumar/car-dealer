import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateModelCodeDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUUID()
  brandId: string

}
