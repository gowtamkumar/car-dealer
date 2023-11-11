import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'

export class ProductFeatureDto {
  @Expose()
  id: string

  @Expose()
  productId: string

  @Expose()
  cdPlayer: boolean

  @Expose()
  sunRoof: boolean

  @Expose()
  alloyWheels: boolean

  @Expose()
  powerSteering: boolean

  @Expose()
  powerWindow: boolean

  @Expose()
  ac: boolean

  @Expose()
  abs: boolean

  @Expose()
  airBag: boolean

  @Expose()
  radio: boolean

  @Expose()
  cdChanger: boolean

  @Expose()
  dvd: boolean

  @Expose()
  tv: boolean

  @Expose()
  powerSeat: boolean

  @Expose()
  backTire: boolean

  @Expose()
  grillGuard: boolean

  @Expose()
  rearSpoiler: boolean

  @Expose()
  centerLocking: boolean

  @Expose()
  jack: boolean

  @Expose()
  spareTire: boolean

  @Expose()
  wheelSpanner: boolean

  @Expose()
  fogLight: boolean

  @Expose()
  backCamera: boolean

  @Expose()
  pushStart: boolean

  @Expose()
  keyLessentry: boolean

  @Expose()
  esc: boolean

  @Expose()
  camera360d: boolean

  @Expose()
  bodyKit: boolean

  @Expose()
  sideAirbag: boolean

  @Expose()
  powerMirror: boolean

  @Expose()
  sideSkirts: boolean

  @Expose()
  fontLipSpoiler: boolean

  @Expose()
  navigation: boolean

  @Expose()
  turbo: boolean

  @Expose()
  nonSmoker: boolean
}
