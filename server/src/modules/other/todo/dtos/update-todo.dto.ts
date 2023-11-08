import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ActivityTypeEnum, TodoStatusEnum } from '../enums'

export class UpdateTodoDto {
  @IsEnum(ActivityTypeEnum)
  type: ActivityTypeEnum

  @IsString()
  @IsNotEmpty()
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
