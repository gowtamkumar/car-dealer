import { Expose } from 'class-transformer'

export class UnionResponseDto {
  @Expose()
  id: number

  @Expose()
  code: string

  @Expose()
  upazilaId: number

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
