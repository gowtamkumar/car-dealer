import { IsString } from 'class-validator'

export class FilterSettingDto {
  @IsString()
  companyName: string
}
