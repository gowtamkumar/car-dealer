import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'

export class FilterTodoDto {
  @IsString()
  name: string

  @IsEnum(StatusEnum)
  status: StatusEnum
}
