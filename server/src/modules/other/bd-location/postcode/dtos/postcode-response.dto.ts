import { Expose } from 'class-transformer'

export class PostcodeResponseDto {
  @Expose()
  id: number

  @Expose()
  divisionId: number

  @Expose()
  districtId: number

  @Expose()
  upazilaId: number

  @Expose()
  unionId: number

  @Expose()
  postOffice: string

  @Expose()
  postCode: string

  @Expose()
  lat: number

  @Expose()
  lng: number
}
