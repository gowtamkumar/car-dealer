import { ErrorType } from '@common/enums/error-type.enum';
import { UnauthorizedException } from '@nestjs/common';

export class DisabledUserException extends UnauthorizedException {
  constructor(errorType: ErrorType) {
    super({
      errorType,
      message: 'User not authorized to login'
    });
  }
}
