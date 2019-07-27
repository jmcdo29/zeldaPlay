import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsCustomIdConstrain implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const id = value;
    return (
      id.startsWith(args.constraints[0]) &&
      /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[ab89][a-z0-9]{3}-[a-z0-9]{12}$/.test(
        id.substring(args.constraints[0].length),
      )
    );
  }
}

export function IsCustomId(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isCustomId',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: IsCustomIdConstrain,
    });
  };
}
