import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../exceptions/validator.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const { message, field } = this.getMessage(errors);
      throw new ValidationException(message, field);
    }
    return value;
  }

  /**
   * To validate
   *
   * @param metatype
   * @private
   */
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getMessage(errors: ValidationError[]) {
    const error = this.getDeepError(errors[0]);
    const field = error.property;
    const message = Object.values(error.constraints)[0] ?? '';
    return {
      message: message,
      field: field,
    };
  }

  getDeepError(error: ValidationError) {
    if (!error.children.length) {
      return error;
    } else {
      return this.getDeepError(error.children[0]);
    }
  }
}
