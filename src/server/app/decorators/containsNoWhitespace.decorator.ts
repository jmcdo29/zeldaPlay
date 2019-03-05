import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
export class NoWhiteSpaceConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /^[\S]*$/.test(value);
  }
}

export function NoWhiteSpace(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'NoWhiteSpace',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: NoWhiteSpaceConstraint
    });
  };
}
