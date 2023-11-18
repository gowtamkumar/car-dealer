import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum } from 'class-validator'

export class FilterBannerDto {
  @IsEnum(StatusEnum)
  status: StatusEnum
}
