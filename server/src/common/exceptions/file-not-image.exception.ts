import { BadRequestException } from '@nestjs/common';

// New
export class FileNotImageException extends BadRequestException {
  constructor(error?: string) {
    super('error.file.not_image', error);
  }
}
