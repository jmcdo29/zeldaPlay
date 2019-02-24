import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function HasLowerCase(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasLowerCase',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return /[a-z]+/.test(value);
        }
      }
    });
  };
}
