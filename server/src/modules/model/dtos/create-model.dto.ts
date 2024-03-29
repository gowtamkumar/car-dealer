import { IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsUUID()
  @IsDefined()
  brandId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

}
