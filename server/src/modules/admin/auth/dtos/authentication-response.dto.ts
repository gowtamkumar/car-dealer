import { UserDto } from "@admin/user/dtos/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class AuthenticationResponseDto {
  @Expose()
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
	user: UserDto;

  @Expose()
  @ApiProperty()
  token: string;
}
