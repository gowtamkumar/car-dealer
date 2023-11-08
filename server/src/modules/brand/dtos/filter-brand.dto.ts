import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class FilterBrandDto {
  @IsString()
  name: string

  @IsString()
  logo: string

  @IsEnum(StatusEnum)
  status: StatusEnum

  @IsUUID('4')
  storeId: string
}
