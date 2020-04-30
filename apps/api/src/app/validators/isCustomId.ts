import { PropertyValidator, PropertyValidatorError } from '@marcj/marshal';
import { idError } from './messages';

export const CustomId = (prefix: string) => {
  class CustomIdValidator implements PropertyValidator {
    validate<T>(value: string): PropertyValidatorError | void {
      const badPrefix = value.startsWith(prefix);
      const validUuid = /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[ab89][a-z0-9]{3}-[a-z0-9]{12}$/.test(
        value.substring(prefix.length),
      );
      if (!(badPrefix && validUuid)) {
        return new PropertyValidatorError(
          badPrefix ? 'bad_prefix' : 'invalid_uuid',
          idError(prefix, value),
        );
      }
    }
  }
  return CustomIdValidator;
};
