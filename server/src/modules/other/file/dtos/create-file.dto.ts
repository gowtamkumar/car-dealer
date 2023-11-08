import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

export class CreateFileDto {
  @IsUUID('4')
  @IsOptional()
  productId: string

  @IsUUID('4')
  @IsOptional()
  incomeId: string

  @IsUUID('4')
  @IsOptional()
  expenseId: string

  @IsUUID('4')
  @IsOptional()
  documentId: string

  @IsUUID('4')
  @IsOptional()
  employeeId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
