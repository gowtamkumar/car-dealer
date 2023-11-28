import { IsDefined, IsJWT, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class ResetPasswordDto {
  // @IsNotEmpty()
  // @IsJWT()
  // @IsDefined()
  // resetPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @IsDefined()
  newPassword: string;
}