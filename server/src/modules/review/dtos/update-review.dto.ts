import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ReivewStatusEnum } from '../enums/review-status-enum'

export class UpdateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string

  @IsString()
  @IsNotEmpty()
  rating: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsEnum(ReivewStatusEnum)
  status: ReivewStatusEnum
}
