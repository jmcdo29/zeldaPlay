import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function NoWhiteSpace(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'NoWhiteSpace',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return /\s{0}/.test(value);
        }
      }
    });
  };
}
