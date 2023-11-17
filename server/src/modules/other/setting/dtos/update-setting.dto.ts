import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  companyName: string

  @IsString()
  @IsNotEmpty()
  fullAddress: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  logo: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  supportPhone: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  email: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  facebookUrl: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  youtubeUrl: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  twitter: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  instagram: string
}
