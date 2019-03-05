import {
  HasNumber,
  HasNumberConstraint
} from './containsNumbericCharacter.decorator';

describe('HasNumber', () => {
  describe('@HasNumber', () => {
    it('should throw an error for no lower case characters', () => {
      expect(HasNumber()).toBeTruthy();
      expect(HasNumber()({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('HasNumberConstraint', () => {
    it('should validate to false', () => {
      const validation = new HasNumberConstraint();
      expect(validation.validate('LKJSALKJSDFKJ', {} as any)).toBeFalsy();
    });
    it('should validate to true', () => {
      const validation = new HasNumberConstraint();
      expect(validation.validate('asdfkaljs2dflkj', {} as any)).toBeTruthy();
    });
  });
});
