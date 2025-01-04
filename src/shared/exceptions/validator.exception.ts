import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(message?: string | object | any, error?: string) {
    super(message, error);
  }
}
