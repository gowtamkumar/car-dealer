import { ErrorType } from '@common/enums/error-type.enum';
import { ConflictException } from '@nestjs/common';

export class PermissionExistsException extends ConflictException {
  constructor(slug: string) {
    super({
      errorType: ErrorType.PermissionExists,
      message: `There's a permission with slug '${slug}'`
    });
  }
}
