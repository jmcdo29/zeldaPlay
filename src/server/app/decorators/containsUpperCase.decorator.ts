import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function HasUpperCase(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasUpperCase',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return /[A-Z]+/.test(value);
        }
      }
    });
  };
}
