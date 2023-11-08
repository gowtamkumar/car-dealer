import { ErrorType } from '@common/enums/error-type.enum';
import { ConflictException } from '@nestjs/common';

export class UserExistsException extends ConflictException {
  constructor(username: string) {
    super({
      errorType: ErrorType.UserExists,
      message: `There's a user with username '${username}'`
    });
  }
}
