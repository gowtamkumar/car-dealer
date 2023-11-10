import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'
import { ReivewStatusEnum } from '../enums/review-status-enum'

export class ReviewDto {
  @Expose()
  id: string

  @Expose()
  description: string

  @Expose()
  rating: string

  @Expose()
  productId: string

  @Expose()
  status: ReivewStatusEnum
}
