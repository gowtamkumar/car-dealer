import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ActivityTypeEnum, TodoStatusEnum } from '../enums'

export class CreateTodoDto {
  @IsEnum(ActivityTypeEnum)
  @IsDefined()
  type: ActivityTypeEnum

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status: TodoStatusEnum

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  feedback: string
}
