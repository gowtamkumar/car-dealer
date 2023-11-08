import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDivisionDto {
  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  bnName: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  url: string

  @Transform(({ value }) =>value &&  Number(value))
  @IsNumber()
  @IsOptional()
  lat: number

  @Transform(({ value }) =>value &&  Number(value))
  @IsNumber()
  @IsOptional()
  lng: number
}