import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function HasNumber(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return /\d+/.test(value);
        }
      }
    });
  };
}
