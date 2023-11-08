import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {

  @ApiProperty({ example: 'Biprodas Roy' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({ required: false, example: 'biprodas.ry@gmail.com'})
  @Transform(({value}) => value || null)
  @IsEmail()
  @IsOptional()
  email: string;

  // @Transform(({value}) => value ? Number(value) : null)
  // @IsNumber()
  // @IsOptional()
  // age: number;

  @ApiProperty({ example: 'biprodas' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @IsDefined()
  username: string;

  @ApiProperty({example: '12345678'})
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @IsDefined()
  password: string;

  @ApiProperty({ required: false, example: [UserRole.Admin] })
  @IsEnum(UserRole, {each: true})
  @IsOptional()
  roles: UserRole[];

}