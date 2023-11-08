import { Expose } from 'class-transformer'

export class UpazilaResponseDto {
  @Expose()
  id: number

  @Expose()
  code: string

  @Expose()
  districtId: number

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
