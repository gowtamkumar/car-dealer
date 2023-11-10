import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class TodoDto {
  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  status: StatusEnum

}
