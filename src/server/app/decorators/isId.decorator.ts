import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

export function IsId(idStart: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          const regex = new RegExp('^' + idStart + 'w{9}$');
          return regex.test(value);
        }
      }
    });
  };
}
