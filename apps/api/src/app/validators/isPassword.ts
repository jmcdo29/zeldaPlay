import { PropertyValidator, PropertyValidatorError } from '@deepkit/type';
import {
  noCapital,
  noLowercase,
  noNumber,
  noSpecial,
  passwordTooShort,
} from './messages';

export class IsPassword implements PropertyValidator {
  validate<T>(value: string): PropertyValidatorError | void {
    const errors = [];
    if (value.length < 8) {
      errors.push(passwordTooShort);
    }
    if (value === value.toLowerCase()) {
      errors.push(noCapital);
    }
    if (value === value.toUpperCase()) {
      errors.push(noLowercase);
    }
    if (!/\d+/.test(value)) {
      errors.push(noNumber);
    }
    if (!/[!@#$%^&*]/.test(value)) {
      errors.push(noSpecial);
    }
    const error = errors.join('. ');
    if (error) {
      return new PropertyValidatorError('bad_pass', error);
    }
  }
}
