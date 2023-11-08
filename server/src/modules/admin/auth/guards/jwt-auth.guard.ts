import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JsonWebTokenError } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AuthStrategy } from '../enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JwtAuth) {
  canActivate(context: ExecutionContext)
  : boolean | Promise<boolean> | Observable<boolean> {
    
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context, status) {
    // You can throw an exception based on either "info" or "err" arguments
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid Token!');
    }
    if (err || info || !user) {
      throw err || new UnauthorizedException(`${info}`);
    }
    return user
  }
}
