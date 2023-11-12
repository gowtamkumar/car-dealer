import { Expose } from 'class-transformer'
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
import { IsArray } from 'class-validator'

export class ProductDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  condition: ConditionEnum

  @Expose()
  auction: boolean

  @Expose()
  brandId: string

  @Expose()
  modelId: string

  @Expose()
  modelCodeId: string

  @Expose()
  edition: string

  @Expose()
  manufactureDate: string

  @Expose()
  registrationDate: string

  @Expose()
  fuelType: FuelTypeEnum

  @Expose()
  transmission: TransmissionEnum

  @Expose()
  bodyType: BodyTypeEnum

  @Expose()
  steering: SteeringEnum

  @Expose()
  color: ColorEnum

  @Expose()
  price: number

  @Expose()
  noOfPass: number

  @Expose()
  milleage: number

  @Expose()
  loadCapacity: string

  @Expose()
  engCc: number

  @Expose()
  engCode: string

  @Expose()
  noOfseat: number

  @Expose()
  noOfOwner: number

  @Expose()
  drivetrain: DrivetrainEnum

  @Expose()
  description: string

  @IsArray()
  photos: string[]

  @Expose()
  divisionId: number

  @Expose()
  districtId: number

  @Expose()
  upazilaId: number

  @Expose()
  userId: string

  @Expose()
  status: ProductStatusEnum
}
