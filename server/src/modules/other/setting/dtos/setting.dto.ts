import { Expose } from 'class-transformer'

export class SettingDto {
  @Expose()
  id: string

  @Expose()
  companyName: string

  @Expose()
  fullAddress: string

  @Expose()
  phone: string

  @Expose()
  logo: string

  @Expose()
  supportPhone: string

  @Expose()
  email: string

  @Expose()
  facebookUrl: string

  @Expose()
  youtubeUrl: string

  @Expose()
  twitter: string

  @Expose()
  instagram: string
}
