import { TaxEnum } from './../enums/tax.enum';
import { Transform } from 'class-transformer'
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @Transform(({ value }) => value || null)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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

  @ValidateIf(o => o.purchasePrice ? true : o.purchaseTax=null)
  @IsEnum(TaxEnum)
  @IsOptional()
  purchaseTax: TaxEnum

  @Transform(({ value }) => value && Number(value))
  @IsNumber()
  @IsOptional()
  salePrice: number

  @ValidateIf(o => o.salePrice ? true : o.saleTax=null)
  @IsEnum(TaxEnum)
  @IsOptional()
  saleTax: TaxEnum

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

}
