import {
  HasUpperCase,
  HasUpperCaseConstraint
} from './containsUpperCase.decorator';

describe('HasUpperCase', () => {
  describe('@HasUpperCase', () => {
    it('should throw an error for no lower case characters', () => {
      expect(HasUpperCase()).toBeTruthy();
      expect(HasUpperCase()({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('HasUpperCaseConstraint', () => {
    it('should validate to false', () => {
      const validation = new HasUpperCaseConstraint();
      expect(validation.validate('LKJSA LKJSD FKJ', {} as any)).toBeTruthy();
    });
    it('should validate to true', () => {
      const validation = new HasUpperCaseConstraint();
      expect(validation.validate('asdfkaljsdflkj', {} as any)).toBeFalsy();
    });
  });
});
