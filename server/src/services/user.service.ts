import * as bcrypt from 'bcryptjs';
import { User } from '../db/models/user_schema';
import { LoginError } from '../utils/errors/LoginError';

/**
 * function to attempt to log the user in
 * @export
 * @param {string} username user's email
 * @param {string} password user's password, not hashed
 * @returns {Promise<string>} user's id
 * @throws {LoginError}
 */
export async function login(
  username: string,
  password: string
): Promise<string> {
  const user = await User.query()
    .findOne({ email: username })
    .select('id', 'password');
  if (!user) {
    throw new LoginError('Username or password is incorrect.', 'NO_USER_FOUND');
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    throw new LoginError(
      'Username or password is incorrect.',
      'INCORRECT_PASSWORD'
    );
  } else {
    return user.id;
  }
}

/**
 * function to allow user to sign up for service
 * @export
 * @param {string} username user's email they want to use
 * @param {string} password user's password
 * @param {string} confPassword  user's password again to make sure it is typed correctly
 * @returns {Promise<Partial<User>>} returns User object with the id attribute only
 * @throws {LoginError}
 */
export async function signUp(
  username: string,
  password: string,
  confPassword: string
): Promise<Partial<User>> {
  verifyPassword(password, confPassword);
  const user = await User.query().where({ email: username });
  if (user.length !== 0) {
    throw new LoginError(
      'Email already in use. Please log in or use a new email.',
      'EMAIL_IN_USE'
    );
  } else {
    const newUser = await User.query()
      .insert({
        email: username,
        password: bcrypt.hashSync(password, 12)
      })
      .returning('*');
    return newUser;
  }
}

export async function update() {}

/**
 * function to make sure password matches confirmation password and matches all criteria for the website
 * @param {string} password
 * @param {string} confPass
 * @returns void
 */
function verifyPassword(password: string, confPass: string): void {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Your password must be at least eight (8) characters long.');
  }
  if (password !== confPass) {
    errors.push('Confirmation password does not match.');
  }
  if (!/[A-Z]+/.test(password)) {
    errors.push('Your password must contain at least one uppercase character.');
  }
  if (!/[a-z]+/.test(password)) {
    errors.push('Your password must contain at least one lowercase character.');
  }
  if (!/\d/.test(password)) {
    errors.push('Your password must contain at least one number.');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Your password must contain at least one special character.');
  }
  if (/\s/.test(password)) {
    errors.push('Your password should not contain any spaces.');
  }
  if (errors.length > 0) {
    let errorMsg = '';
    errors.forEach((error) => {
      errorMsg += error + ' ';
    });
    throw new LoginError(errorMsg, 'BAD_PASS');
  }
  return;
}
