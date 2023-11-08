import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;
}