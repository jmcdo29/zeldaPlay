import {
  HasLowerCase,
  HasLowerCaseConstraint
} from './containsLowerCase.decorator';

describe('HasLowerCase', () => {
  describe('@HasLowerCase', () => {
    it('should throw an error for no lower case characters', () => {
      expect(HasLowerCase()).toBeTruthy();
      expect(HasLowerCase()({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('HasLowerCaseConstraint', () => {
    it('should validate to false', () => {
      const validation = new HasLowerCaseConstraint();
      expect(validation.validate('LKJSALKJSDFKJ', {} as any)).toBeFalsy();
    });
    it('should validate to true', () => {
      const validation = new HasLowerCaseConstraint();
      expect(validation.validate('asdfkaljsdflkj', {} as any)).toBeTruthy();
    });
  });
});
