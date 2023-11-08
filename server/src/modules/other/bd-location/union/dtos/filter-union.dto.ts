import { IsString } from 'class-validator'

export class FilterUnionDto {
  @IsString()
  name?: string

  @IsString()
  bnName?: string
}
