import { StatusEnum } from '@common/enums/status-enum'
import { Expose } from 'class-transformer'
import { TaxEnum } from '../enums/tax.enum'

export class ProductDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  code: string

  @Expose()
  qtyAlert: number

  @Expose()
  brandId: string

  @Expose()
  barcodeSymbology: string

  @Expose()
  itemBarcode: string

  @Expose()
  purchasePrice: number

  @Expose()
  purchaseTax: TaxEnum

  @Expose()
  salePrice: number

  @Expose()
  mrp: number

  @Expose()
  description: string

  @Expose()
  photo: string

  @Expose()
  status: StatusEnum
}
