import { StatusEnum } from '@common/enums/status-enum'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateProductFeatureDto {
  // @IsUUID()
  // @IsNotEmpty()
  // productId: string

  @IsBoolean()
  @IsOptional()
  cdPlayer: boolean

  @IsBoolean()
  @IsOptional()
  sunRoof: boolean

  @IsBoolean()
  @IsOptional()
  alloyWheels: boolean

  @IsBoolean()
  @IsOptional()
  powerSteering: boolean

  @IsBoolean()
  @IsOptional()
  powerWindow: boolean

  @IsBoolean()
  @IsOptional()
  ac: boolean

  @IsBoolean()
  @IsOptional()
  abs: boolean

  @IsBoolean()
  @IsOptional()
  airBag: boolean

  @IsBoolean()
  @IsOptional()
  radio: boolean

  @IsBoolean()
  @IsOptional()
  cdChanger: boolean

  @IsBoolean()
  @IsOptional()
  dvd: boolean

  @IsBoolean()
  @IsOptional()
  tv: boolean

  @IsBoolean()
  @IsOptional()
  powerSeat: boolean

  @IsBoolean()
  @IsOptional()
  backTire: boolean

  @IsBoolean()
  @IsOptional()
  grillGuard: boolean

  @IsBoolean()
  @IsOptional()
  rearSpoiler: boolean

  @IsBoolean()
  @IsOptional()
  centerLocking: boolean

  @IsBoolean()
  @IsOptional()
  jack: boolean

  @IsBoolean()
  @IsOptional()
  spareTire: boolean

  @IsBoolean()
  @IsOptional()
  wheelSpanner: boolean

  @IsBoolean()
  @IsOptional()
  fogLight: boolean

  @IsBoolean()
  @IsOptional()
  backCamera: boolean

  @IsBoolean()
  @IsOptional()
  pushStart: boolean

  @IsBoolean()
  @IsOptional()
  keyLessentry: boolean

  @IsBoolean()
  @IsOptional()
  esc: boolean

  @IsBoolean()
  @IsOptional()
  camera360d: boolean

  @IsBoolean()
  @IsOptional()
  bodyKit: boolean

  @IsBoolean()
  @IsOptional()
  sideAirbag: boolean

  @IsBoolean()
  @IsOptional()
  powerMirror: boolean

  @IsBoolean()
  @IsOptional()
  sideSkirts: boolean

  @IsBoolean()
  @IsOptional()
  fontLipSpoiler: boolean

  @IsBoolean()
  @IsOptional()
  navigation: boolean

  @IsBoolean()
  @IsOptional()
  turbo: boolean

  @IsBoolean()
  @IsOptional()
  nonSmoker: boolean
}
