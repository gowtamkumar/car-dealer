import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
import { UserStatus } from "../enums/user-status.enum";


export class UserDto {

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  roles: UserRole[];
  
  @Expose()
  status: UserStatus;

}
