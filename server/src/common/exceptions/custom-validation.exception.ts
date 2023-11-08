import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class CustomValidationException extends BadRequestException {
  constructor(validateBy: string, errors: any) {
    super({
      // errorType: ErrorType.ValidationError,
      validateBy: 'ClassValidator',
      errors
    });
  }
}
