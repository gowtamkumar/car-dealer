import { IsBoolean, IsDateString, IsEnum, IsNumber, IsString } from 'class-validator'
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

export class FilterProductDto {
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
  price: number

  @IsNumber()
  noOfPass: number

  @IsNumber()
  milleage: number

  @IsString()
  loadCapacity: string

  @IsString()
  engCc: string

  @IsString()
  engCode: string

  @IsNumber()
  noOfseat: number

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

  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum

  // product Feature
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  ac: boolean
}
