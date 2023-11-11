import { IsString } from 'class-validator'

export class FilterProductFeatureDto {
  @IsString()
  productId: string
}
