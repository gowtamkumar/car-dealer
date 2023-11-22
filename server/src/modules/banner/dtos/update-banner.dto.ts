import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateBannerDto {
  @IsString()
  @IsNotEmpty()
  image: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum
}
