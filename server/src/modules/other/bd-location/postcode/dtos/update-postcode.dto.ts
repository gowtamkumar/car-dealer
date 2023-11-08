import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdatePostcodeDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  divisionId: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
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
  postOffice: string

  @IsString()
  @IsNotEmpty()
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
