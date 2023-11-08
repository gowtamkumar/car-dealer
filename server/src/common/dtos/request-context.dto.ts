import { UserDto } from "@admin/user/dtos/user.dto";

export class RequestContextDto {
  public requestId: string;

  public ip: string;
  // public clientIp: string;

  public protocol: string;
  public host: string;
  public url: string;

  // public userId: string;
  public user: UserDto;
}
