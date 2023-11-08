import { StatusEnum } from '@common/enums/status-enum'
import { Transform } from 'class-transformer'
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'
import { TaxEnum } from '../enums/tax.enum'

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  code: string


  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  qtyAlert: number

  @IsUUID('4')
  @IsOptional()
  brandId: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  barcodeSymbology: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  itemBarcode: string

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  purchasePrice: number

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  salePrice: number


  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  mrp: number


  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  photo: string

  @IsEnum(StatusEnum)
  status: StatusEnum
}
