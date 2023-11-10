import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class FilterReviewDto {
  @IsString()
  productId: string

  @IsString()
  rating: string

  @IsEnum(StatusEnum)
  status: StatusEnum
}
