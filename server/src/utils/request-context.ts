import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Key } from '@common/enums/keys.enum';
import { UserDto } from '@admin/user/dtos/user.dto';

// declare module "express" { 
//   export interface Request {
//     user: UserDto
//   }
// }

// Creates a RequestContext object from Request
export function createRequestContext(request: Request & { user: UserDto }): RequestContextDto {
  const ctx = new RequestContextDto();
  ctx.requestId = request.header(Key.RequestIdTokenHeader);
  ctx.ip = request.header(Key.ForwardedForTokenHeader) ? request.header(Key.ForwardedForTokenHeader) : request.ip;
  // ctx.clientIp = request.clientIp;

  ctx.protocol = request.protocol;
  ctx.host = request.get('host');
  ctx.url = request.url;
  
  // If request.user does not exist, we explicitly set it to null.
  ctx.user = request.user ?
    plainToClass(UserDto, request.user, { excludeExtraneousValues: true })
  : null;

  return ctx;
}
