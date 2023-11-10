import { StatusEnum } from '@common/enums/status-enum'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
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

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  engCc: string

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

  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsEnum(ProductStatusEnum)
  status: ProductStatusEnum
}