import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  companyName: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  fullAddress: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
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
