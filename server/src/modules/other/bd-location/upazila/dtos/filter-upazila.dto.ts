import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class FilterUpazilaDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  bnName: string
}