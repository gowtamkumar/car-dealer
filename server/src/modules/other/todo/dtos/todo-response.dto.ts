import { Expose } from 'class-transformer'
import { TodoStatusEnum } from '../enums'

export class TodoResponseDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  status: TodoStatusEnum
}
