import { ErrorType } from '@common/enums/error-type.enum';
import { ForbiddenException } from '@nestjs/common';

export class InvalidCurrentPasswordException extends ForbiddenException {
  constructor() {
    super({
      errorType: ErrorType.InvalidCurrentPassword,
      message: 'The current password is invalid'
    });
  }
}
