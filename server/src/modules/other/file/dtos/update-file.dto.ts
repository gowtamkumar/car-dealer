import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateFileDto {
  @IsNotEmpty()
  @IsString()
  fieldname: string

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
  employeeId: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
