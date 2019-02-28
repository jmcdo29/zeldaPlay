import {
  NoWhiteSpace,
  NoWhiteSpaceConstraint
} from './containsNoWhitespace.decorator';

describe('NoWhiteSpace', () => {
  describe('@NoWhiteSpace', () => {
    it('should throw an error for no lower case characters', () => {
      expect(NoWhiteSpace()).toBeTruthy();
      expect(NoWhiteSpace()({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('NoWhiteSpaceConstraint', () => {
    it('should validate to false', () => {
      const validation = new NoWhiteSpaceConstraint();
      expect(validation.validate('LKJSA LKJSD FKJ', {} as any)).toBeFalsy();
    });
    it('should validate to true', () => {
      const validation = new NoWhiteSpaceConstraint();
      expect(validation.validate('asdfkaljsdflkj', {} as any)).toBeTruthy();
    });
  });
});
