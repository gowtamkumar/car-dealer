import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUnionDto {
  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  upazilaId: number

  @IsString()
  @IsNotEmpty()
  name: string

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
