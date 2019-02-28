import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator';

export class HasLowerCaseConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /[a-z]+/.test(value);
  }
}

export function HasLowerCase(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasLowerCase',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: HasLowerCaseConstraint
    });
  };
}
