// tslint:disable

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

/**
 * Checks that the password field contains at least one uppercase, lowercase, number, and special character.
 */
export function IsPassword(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: {
        validate(value: string, args: ValidationArguments) {
          let error = '';
          if (!/\d+/.test(value)) {
            error += 'Password must contain at least one number.';
          }
          if (!/[A-Z]+/.test(value)) {
            error += 'Password must contain at least one uppercase character.';
          }
          if (!/[a-z]+/.test(value)) {
            error += 'Password must contain at least one lowercase character.';
          }
          if (!/[!@#$%^&*]+/.test(value)) {
            error += 'Password must contain at least one special character.';
          }
          if (error) {
            throw new Error('Invalid password. ' + error);
          }
          return true;
        }
      }
    });
  };
}
