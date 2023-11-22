import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class BannerDto {
  @Expose()
  id: string

  @Expose()
  image: string

  @Expose()
  title: string

  @Expose()
  status: StatusEnum
}
