import { StatusEnum } from '@common/enums/status-enum'
import { Transform, Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
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
import { ToBoolean } from '@common/decorators/transforms.decorator'

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(ConditionEnum)
  condition: ConditionEnum

  @IsBoolean()
  @ToBoolean()
  @IsOptional()
  auction: boolean

  @IsUUID()
  @IsNotEmpty()
  brandId: string

  @IsUUID()
  @IsNotEmpty()
  modelId: string

  @IsUUID()
  @IsNotEmpty()
  modelCodeId: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  edition: string

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  manufactureDate: string

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
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

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  price: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  noOfPass: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  milleage: number

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  loadCapacity: string

  @Transform(({ value }) => Number(value) || null)
  @IsNumber()
  @IsOptional()
  engCc: number

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  engCode: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  noOfseat: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  noOfOwner: number

  @IsEnum(DrivetrainEnum)
  drivetrain: DrivetrainEnum

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string

  @IsArray()
  @IsOptional()
  photos: string[]

  @IsNumber()
  @IsNotEmpty()
  divisionId: number

  @IsNumber()
  @IsNotEmpty()
  districtId: number

  @IsNumber()
  @IsNotEmpty()
  upazilaId: number

  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum


  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({each: true})
  @IsOptional()
  productFeature: string[]

  // @IsObject()
  // @Type(() => CreateProductFeatureDto)
  // @IsNotEmptyObject()
  // @IsOptional()
  // productFeature: CreateProductFeatureDto
}
