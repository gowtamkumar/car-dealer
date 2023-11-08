import { StatusEnum } from '@common/enums/status-enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  logo: string

  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum

  @IsUUID('4')
  @IsOptional()
  storeId: string
}
