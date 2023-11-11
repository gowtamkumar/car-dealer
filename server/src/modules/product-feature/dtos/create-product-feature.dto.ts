import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsUUID,
} from 'class-validator'

export class CreateProductFeatureDto {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  productId: string

  @IsBoolean()
  @IsDefined()
  cdPlayer: boolean

  @IsBoolean()
  @IsDefined()
  sunRoof: boolean

  @IsBoolean()
  @IsDefined()
  alloyWheels: boolean

  @IsBoolean()
  @IsDefined()
  powerSteering: boolean

  @IsBoolean()
  @IsDefined()
  powerWindow: boolean

  @IsBoolean()
  @IsDefined()
  ac: boolean

  @IsBoolean()
  @IsDefined()
  abs: boolean

  @IsBoolean()
  @IsDefined()
  airBag: boolean

  @IsBoolean()
  @IsDefined()
  radio: boolean

  @IsBoolean()
  @IsDefined()
  cdChanger: boolean

  @IsBoolean()
  @IsDefined()
  dvd: boolean

  @IsBoolean()
  @IsDefined()
  tv: boolean

  @IsBoolean()
  @IsDefined()
  powerSeat: boolean

  @IsBoolean()
  @IsDefined()
  backTire: boolean

  @IsBoolean()
  @IsDefined()
  grillGuard: boolean

  @IsBoolean()
  @IsDefined()
  rearSpoiler: boolean

  @IsBoolean()
  @IsDefined()
  centerLocking: boolean

  @IsBoolean()
  @IsDefined()
  jack: boolean

  @IsBoolean()
  @IsDefined()
  spareTire: boolean

  @IsBoolean()
  @IsDefined()
  wheelSpanner: boolean

  @IsBoolean()
  @IsDefined()
  fogLight: boolean

  @IsBoolean()
  @IsDefined()
  backCamera: boolean

  @IsBoolean()
  @IsDefined()
  pushStart: boolean

  @IsBoolean()
  @IsDefined()
  keyLessentry: boolean

  @IsBoolean()
  @IsDefined()
  esc: boolean

  @IsBoolean()
  @IsDefined()
  camera360d: boolean

  @IsBoolean()
  @IsDefined()
  bodyKit: boolean

  @IsBoolean()
  @IsDefined()
  sideAirbag: boolean

  @IsBoolean()
  @IsDefined()
  powerMirror: boolean

  @IsBoolean()
  @IsDefined()
  sideSkirts: boolean

  @IsBoolean()
  @IsDefined()
  fontLipSpoiler: boolean

  @IsBoolean()
  @IsDefined()
  navigation: boolean

  @IsBoolean()
  @IsDefined()
  turbo: boolean

  @IsBoolean()
  @IsDefined()
  nonSmoker: boolean
}
