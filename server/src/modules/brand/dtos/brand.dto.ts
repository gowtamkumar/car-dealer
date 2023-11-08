import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class BrandDto {
  @Expose()
  name: string

  @Expose()
  logo: string

  @Expose()
  status: StatusEnum

}
