import { IsDefined, IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordMailDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;

  // @IsNotEmpty()
  // @IsJWT()
  // @IsDefined()
  // resetToken: string;

  @IsString()
  @IsDefined()
  resetUrl: string;
}
