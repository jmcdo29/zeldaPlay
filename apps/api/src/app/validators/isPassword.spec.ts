import { IsPassword, IsPasswordConstraint } from './';

const testCase = (password: string, error: string) => () => {
  const validator = new IsPasswordConstraint();
  const invalidPassword = 'Invalid password. ';
  try {
    validator.validate(password, {} as any);
  } catch (err) {
    expect(err.message).toBe(invalidPassword + error);
  }
};

describe('isCustomId', () => {
  const validator = new IsPasswordConstraint();
  it('should return the function for isCustomId', () => {
    const func = IsPassword();
    expect(typeof func).toBe('function');
  });
  describe('errors', () => {
    it(
      'should throw an error for less than 8 characters',
      testCase('Aa1!', 'Password must be at least 8 characters long.'),
    );
    it(
      'should throw an error for no lowercase characters',
      testCase(
        'AA1@LKADSF!',
        'Password must contain at least one lowercase character.',
      ),
    );
    it(
      'should throw an error for no uppercase characters',
      testCase(
        'aa1@lkadsf!',
        'Password must contain at least one uppercase character.',
      ),
    );
    it(
      'should throw an error for mno special characters',
      testCase(
        'Aa1gLKADSFb',
        'Password must contain at least one special character.',
      ),
    );
    it(
      'should throw an error for no digits',
      testCase('AAi@LKADSF!', 'Password must contain at least one number.'),
    );
    it(
      'should have one large error for all',
      testCase(
        '',
        'Password must be at least 8 characters long. ' +
          'Password must contain at least one number. ' +
          'Password must contain at least one uppercase character. ' +
          'Password must contain at least one lowercase character. ' +
          'Password must contain at least one special character.',
      ),
    );
  });
  describe('success', () => {
    it('should validate successfully', () => {
      expect(validator.validate('Pa$$w0rd!', {} as any)).toBeTruthy();
    });
  });
});
