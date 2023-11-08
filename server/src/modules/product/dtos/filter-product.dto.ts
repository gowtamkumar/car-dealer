import { IsString } from 'class-validator'

export class FilterProductDto {
  @IsString()
  name?: string
}
