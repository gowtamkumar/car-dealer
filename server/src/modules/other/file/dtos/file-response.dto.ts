import { Expose } from 'class-transformer'

export class FileResponseDto {
  @Expose()
  id: string

  @Expose()
  fieldname: string

  @Expose()
  originalname: string

  @Expose()
  encoding: string

  @Expose()
  mimetype: string

  @Expose()
  destination: string

  @Expose()
  filename: string

  @Expose()
  path: string

  @Expose()
  size: number

  @Expose()
  isActive: boolean

  @Expose()
  productId: string
}
