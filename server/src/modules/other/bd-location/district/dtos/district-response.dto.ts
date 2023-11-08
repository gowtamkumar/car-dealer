import { Expose } from 'class-transformer'

export class DistrictResponseDto {
  @Expose()
  id: number

  @Expose()
  code: string

  @Expose()
  divisionId: number

  @Expose()
  name: string

  @Expose()
  bnName: string

  @Expose()
  url: string

  @Expose()
  lat: number

  @Expose()
  lng: number
}
