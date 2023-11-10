import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  productId: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  rating: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string
}
