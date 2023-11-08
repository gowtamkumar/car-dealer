import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class FilterDistrictDto {
  @IsString()
  name?: string

  @IsString()
  bnName?: string
}
