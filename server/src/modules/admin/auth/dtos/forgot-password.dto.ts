import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsNumber()
  @IsDefined()
  otp: number;
}