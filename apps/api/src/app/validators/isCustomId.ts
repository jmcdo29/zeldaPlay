// tslint:disable

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsCustomId(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCustomId',
      target: object.constructor,
      propertyName,
      constraints: [property],
      validator: {
        validate(value: string, args: ValidationArguments) {
          const id = value;
          return (
            id.startsWith(args.constraints[0]) &&
            /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[ab89][a-z0-9]{3}-[a-z0-9]{12}$/.test(
              id.substring(args.constraints[0].length),
            )
          );
        },
      },
    });
  };
}
