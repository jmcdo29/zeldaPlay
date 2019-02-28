import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
export class HasUpperCaseConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /[A-Z]+/.test(value);
  }
}

export function HasUpperCase(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasUpperCase',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: HasUpperCaseConstraint
    });
  };
}
