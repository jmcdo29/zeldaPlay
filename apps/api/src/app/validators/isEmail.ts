import { PropertyValidator, PropertyValidatorError } from '@marcj/marshal';
import { emailError } from './messages';

export class IsEmail implements PropertyValidator {
  validate(value: string): PropertyValidatorError | void {
    if (!value.includes('@')) {
      return new PropertyValidatorError('bad_email', emailError(value));
    }
  }
}
