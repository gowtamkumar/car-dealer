import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class LoginCredentialsDto {

  @ApiProperty({ example: 'gowtamkumar' })
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}