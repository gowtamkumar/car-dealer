import { Transform, Type } from 'class-transformer'
import {
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
  SteeringEnum,
  TransmissionEnum,
} from '../enums'
import { ToBoolean } from '@common/decorators/transforms.decorator'
import { CreateProductFeatureDto } from '@modules/product-feature/dtos'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsEnum(ConditionEnum)
  @IsDefined()
  condition: ConditionEnum

  @IsBoolean()
  @ToBoolean()
  @IsOptional()
  auction: boolean

  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  brandId: string

  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  modelId: string

  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
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
  @IsDefined()
  fuelType: FuelTypeEnum

  @IsEnum(TransmissionEnum)
  @IsDefined()
  transmission: TransmissionEnum

  @IsEnum(BodyTypeEnum)
  @IsDefined()
  bodyType: BodyTypeEnum

  @IsEnum(SteeringEnum)
  @IsDefined()
  steering: SteeringEnum

  @IsEnum(ColorEnum)
  @IsDefined()
  color: ColorEnum

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  price: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsDefined()
  noOfPass: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsDefined()
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
  @IsDefined()
  noOfseat: number

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  noOfOwner: number

  @IsEnum(DrivetrainEnum)
  @IsDefined()
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
  @IsDefined()
  divisionId: number

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  districtId: number

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  upazilaId: number
  
  @IsObject()
  @Type(()=> CreateProductFeatureDto)
  @IsNotEmptyObject()
  productFeature: CreateProductFeatureDto
}
