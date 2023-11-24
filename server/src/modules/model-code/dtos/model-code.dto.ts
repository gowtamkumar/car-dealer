import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class ModelCodeDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  modelId: string

  @Expose()
  isActive: boolean

}
