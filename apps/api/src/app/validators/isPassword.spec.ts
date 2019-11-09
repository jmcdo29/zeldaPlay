import { IsPassword, IsPasswordConstraint } from './';

describe('isCustomId', () => {
  const validator = new IsPasswordConstraint();
  it('should return the function for isCustomId', () => {
    const func = IsPassword();
    expect(typeof func).toBe('function');
    expect(func({}, '')).toBeFalsy();
  });
  describe('errors', () => {
    const invalidPassword = 'Invalid password. ';
    it('should throw an error for less than 8 characters', () => {
      try {
        validator.validate('Aa1!', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword + 'Password must be at least 8 characters long.',
        );
      }
    });
    it('should throw an error for no lowercase characters', () => {
      try {
        validator.validate('AA1@LKADSF!', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword +
            'Password must contain at least one lowercase character.',
        );
      }
    });
    it('should throw an error for no uppercase characters', () => {
      try {
        validator.validate('aa1@lkadsf!', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword +
            'Password must contain at least one uppercase character.',
        );
      }
    });
    it('should throw an error for mno special characters', () => {
      try {
        validator.validate('Aa1gLKADSFb', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword +
            'Password must contain at least one special character.',
        );
      }
    });
    it('should throw an error for no digits', () => {
      try {
        validator.validate('AAi@LKADSF!', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword + 'Password must contain at least one number.',
        );
      }
    });
    it('should have one large error for all', () => {
      try {
        validator.validate('', {} as any);
      } catch (error) {
        expect(error.message).toBe(
          invalidPassword +
            'Password must be at least 8 characters long. ' +
            'Password must contain at least one number. ' +
            'Password must contain at least one uppercase character. ' +
            'Password must contain at least one lowercase character. ' +
            'Password must contain at least one special character.',
        );
      }
    });
  });
  describe('success', () => {
    it('should validate successfully', () => {
      expect(validator.validate('Pa$$w0rd!', {} as any)).toBeTruthy();
    });
  });
});
