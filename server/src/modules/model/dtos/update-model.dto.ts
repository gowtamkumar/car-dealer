import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUUID()
  brandId: string

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum
}