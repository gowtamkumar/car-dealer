import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class BannerDto {
  @Expose()
  id: string

  @Expose()
  photo: string

  @Expose()
  title: string

  @Expose()
  isActive: boolean
}
