import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  image: string

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum
}