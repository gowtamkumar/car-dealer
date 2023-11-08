import { ErrorType } from '@common/enums/error-type.enum';
import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.InvalidCredentials,
      message: 'Invalid credentials'
    });
  }
}
