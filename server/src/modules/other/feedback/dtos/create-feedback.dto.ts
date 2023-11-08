import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateFeedbackDto {
  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string

  @IsUUID()
  @IsOptional()
  createdBy: string
}
