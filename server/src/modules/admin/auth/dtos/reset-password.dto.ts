import { IsDefined, IsJWT, IsNotEmpty, IsString, Length } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsJWT()
  @IsDefined()
  resetPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @IsDefined()
  newPassword: string;
}