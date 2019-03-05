import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
export class IsIdConstraint implements ValidatorConstraintInterface {
  constructor(private _idStart: string) {}

  validate(value: string, args: ValidationArguments): boolean {
    const regex = new RegExp('^' + this._idStart + '\\w{9}$');
    return regex.test(value);
  }
}

export function IsId(idStart: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: new IsIdConstraint(idStart)
    });
  };
}
