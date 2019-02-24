import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function HasSpecialCharacter(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasSpecialCharacter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return /[!@#$%^&*\(\)\-\_+]+/.test(value);
        }
      }
    });
  };
}
