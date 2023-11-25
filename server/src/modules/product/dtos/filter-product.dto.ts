import { IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsString } from 'class-validator'
import {
  BodyTypeEnum,
  ColorEnum,
  ConditionEnum,
  DrivetrainEnum,
  FuelTypeEnum,
  ProductStatusEnum,
  SteeringEnum,
  TransmissionEnum,
} from '../enums'
import { Transform } from 'class-transformer'
import { ProductFeatureEnum } from '../enums/product-Feature.enum'

export class FilterProductDto {
  @IsString()
  search: string

  @IsString()
  name: string

  @IsEnum(ConditionEnum)
  condition: ConditionEnum

  @IsBoolean()
  auction: boolean

  @IsString()
  brandId: string

  @IsString()
  modelId: string

  @IsString()
  modelCodeId: string

  @IsString()
  edition: string

  @IsDateString()
  manufactureDate: string

  @IsDateString()
  registrationDate: string

  @IsEnum(FuelTypeEnum)
  fuelType: FuelTypeEnum

  @IsEnum(TransmissionEnum)
  transmission: TransmissionEnum

  @IsEnum(BodyTypeEnum)
  bodyType: BodyTypeEnum

  @IsEnum(SteeringEnum)
  steering: SteeringEnum

  @IsEnum(ColorEnum)
  color: ColorEnum

  @IsNumber()
  minPrice: number

  @IsNumber()
  maxPrice: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  minNoOfPass: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxNoOfPass: number

  @IsNumber()
  minMilleage: number

  @IsNumber()
  maxMilleage: number

  @IsString()
  minLoadCapacity: string

  @IsString()
  maxLoadCapacity: string

  @IsString()
  minEngCc: number

  @IsString()
  maxEngCc: number

  @IsString()
  engCode: string

  @IsString()
  noOfseat: string

  @IsNumber()
  noOfOwner: number

  @IsEnum(DrivetrainEnum)
  drivetrain: DrivetrainEnum

  @IsNumber()
  divisionId: number

  @IsNumber()
  districtId: number

  @IsNumber()
  upazilaId: number

  @IsString()
  userId: string

  @IsBoolean()
  accidentHistory: boolean

  @IsBoolean()
  lowPrice: boolean

  @IsBoolean()
  highPrice: boolean

  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum

  @IsString()
  productFeature: string




  // product Feature
  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // ac: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // cdPlayer: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // sunRoof: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // alloyWheels: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // powerSteering: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // powerWindow: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // abs: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // airBag: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // radio: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // cdChanger: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // dvd: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // tv: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // powerSeat: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // backTire: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // grillGuard: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // rearSpoiler: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // centerLocking: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // jack: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // spareTire: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // wheelSpanner: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // fogLight: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // backCamera: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // pushStart: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // keyLessentry: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // esc: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // camera360d: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // bodyKit: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // sideAirbag: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // powerMirror: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // sideSkirts: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // fontLipSpoiler: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // navigation: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // turbo: boolean

  // @IsBoolean()
  // @Transform(({ obj, key }) => obj[key] === 'true')
  // nonSmoker: boolean
}
