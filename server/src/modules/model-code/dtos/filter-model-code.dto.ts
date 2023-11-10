import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class FilterModelCodeDto {
  @IsString()
  name: string

  @IsString()
  brandId: string

}
