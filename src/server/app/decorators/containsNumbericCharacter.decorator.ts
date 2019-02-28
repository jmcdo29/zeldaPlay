import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
export class HasNumberConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /\d+/.test(value);
  }
}

export function HasNumber(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: HasNumberConstraint
    });
  };
}
