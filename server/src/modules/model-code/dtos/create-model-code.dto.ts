import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'
import { StatusEnum } from '@common/enums/status-enum'

export class CreateModelCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsUUID()
  @IsDefined()
  brandId: string

}
