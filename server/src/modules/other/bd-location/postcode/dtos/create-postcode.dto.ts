import { Transform } from 'class-transformer'
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePostcodeDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsDefined()
  divisionId: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsDefined()
  districtId: number

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  upazilaId: number

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  unionId: number

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  postOffice: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  postCode: string

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  lat: number

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  lng: number
}
