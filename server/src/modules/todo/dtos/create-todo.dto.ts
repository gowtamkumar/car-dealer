import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsString()
  @IsNotEmpty()
  swacription: string

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum

}
