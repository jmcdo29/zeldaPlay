import {
  HasSpecialCharacter,
  HasSpecialCharacterConstraint
} from './containsSpecialCharacter.decorator';

describe('HasSpecialCharacter', () => {
  describe('@HasSpecialCharacter', () => {
    it('should throw an error for no lower case characters', () => {
      expect(HasSpecialCharacter()).toBeTruthy();
      expect(HasSpecialCharacter()({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('HasSpecialCharacterConstraint', () => {
    it('should validate to false', () => {
      const validation = new HasSpecialCharacterConstraint();
      expect(validation.validate('LKJSALKJSDFKJ', {} as any)).toBeFalsy();
    });
    it('should validate to true', () => {
      const validation = new HasSpecialCharacterConstraint();
      expect(validation.validate('asdfk$aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk!aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk@aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk#aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk%aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk^aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk&aljsdflkj', {} as any)).toBeTruthy();
      expect(validation.validate('asdfk*aljsdflkj', {} as any)).toBeTruthy();
    });
  });
});
