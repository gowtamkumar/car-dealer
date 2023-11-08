import { ErrorType } from '@common/enums/error-type.enum';
import { ConflictException } from '@nestjs/common';

export class ForeignKeyConflictException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.ForeignKeyConflict,
      message: `Foreign key conflict`
    });
  }
}
