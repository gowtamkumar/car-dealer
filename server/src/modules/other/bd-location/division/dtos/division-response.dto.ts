import { Expose } from "class-transformer";
export class DivisionResponseDto {
  @Expose()
  id: number

  @Expose()
  code: string

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