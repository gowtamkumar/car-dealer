import { IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  logo: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

}
