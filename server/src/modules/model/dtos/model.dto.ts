import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class ModelDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  status: StatusEnum
}
