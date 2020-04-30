import { PropertyValidator, PropertyValidatorError } from '@marcj/marshal';
import { abilityScoreError } from './messages';

export class AbilityScoreValidator implements PropertyValidator {
  validate(value: number): PropertyValidatorError | void {
    const tooLow = value < 1;
    const tooHigh = value > 20;
    if (tooLow || tooHigh) {
      return new PropertyValidatorError(
        'invalid_ability_score',
        abilityScoreError(value),
      );
    }
  }
}
