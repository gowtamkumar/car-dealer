import { IsString } from 'class-validator'

export class FilterDivisionDto {
  @IsString()
  name?: any

  @IsString()
  bnName?: any
}
