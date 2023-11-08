import { IsNotEmpty, IsString } from 'class-validator'

export class FilterPostcodeDto {
  @IsString()
  postOffice?: string

  @IsString()
  postCode?: string
}
