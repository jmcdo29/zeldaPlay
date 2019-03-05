import { IsId, IsIdConstraint } from './isId.decorator';

describe('IsId', () => {
  describe('@IsId', () => {
    it('should throw an error for no lower case characters', () => {
      expect(IsId('00C')).toBeTruthy();
      expect(IsId('00C')({}, 'noLowerCase')).toBeFalsy();
    });
  });
  describe('IsIdConstraint', () => {
    it('should validate to false', () => {
      const validation = new IsIdConstraint('00C');
      expect(validation.validate('LKJSA LKJSD FKJ', {} as any)).toBeFalsy();
    });
    it('should validate to true', () => {
      const validation = new IsIdConstraint('asd');
      expect(validation.validate('asdfkaljsdfl', {} as any)).toBeTruthy();
    });
  });
});
