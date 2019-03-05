import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
export class HasSpecialCharacterConstraint
  implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return /[!@#$%^&*\(\)\-\_+]+/.test(value);
  }
}

export function HasSpecialCharacter(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasSpecialCharacter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: HasSpecialCharacterConstraint
    });
  };
}
