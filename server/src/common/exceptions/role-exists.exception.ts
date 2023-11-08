import { ErrorType } from '@common/enums/error-type.enum';
import { ConflictException } from '@nestjs/common';

export class RoleExistsException extends ConflictException {
  constructor(name: string) {
    super({
      errorType: ErrorType.RoleExists,
      message: `There's a role with name '${name}'`
    });
  }
}
