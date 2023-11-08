import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUpazilaDto {
  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string

  @IsString()
  @IsNotEmpty()
  name: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  districtId: number

  @IsString()
  @IsNotEmpty()
  bnName: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  url: string

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  lat: number

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  lng: number
}
