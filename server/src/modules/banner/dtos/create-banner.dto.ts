import { IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  photo: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

}
