import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class FilterModelDto {
  @IsString()
  name: string

  @IsEnum(StatusEnum)
  status: StatusEnum

}
