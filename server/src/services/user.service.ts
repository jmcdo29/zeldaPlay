import * as bcrypt from 'bcryptjs';
import { User } from '../db/models/user_schema';
import { DatabaseError } from '../utils/errors/DatabaseError';
import { LoginError } from '../utils/errors/LoginError';

/**
 * function to attempt to log the user in
 * @export
 * @param {string} username user's email
 * @param {string} password user's password, not hashed
 * @returns {Promise<string>} user's id
 * @throws {LoginError}
 */
export function login(username: string, password: string): Promise<string> {
  return User.query()
    .findOne({ email: username })
    .select('id', 'password')
    .then((user) => {
      if (!user) {
        throw new LoginError(
          'Username or password is incorrect.',
          'NO_USER_FOUND'
        );
      }
      return Promise.all([
        Promise.resolve(user),
        bcrypt.compare(password, user.password)
      ]);
    })
    .then((results) => {
      if (!results[1]) {
        throw new LoginError(
          'Username or password is incorrect.',
          'INCORRECT_PASSWORD'
        );
      } else {
        return results[0].id;
      }
    })
    .catch((err: Error) => {
      if (!(err instanceof LoginError)) {
        const newErr = new DatabaseError(err.message, 'DB_ERROR');
        newErr.stack = err.stack;
        err = newErr;
      }
      throw err as LoginError;
    });
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
export function signUp(
  username: string,
  password: string,
  confPassword: string
): Promise<Partial<User>> {
  return verifyPassword(password, confPassword)
    .then(() => {
      return User.query().where({ email: username });
    })
    .then((user) => {
      if (user.length !== 0) {
        throw new LoginError(
          'Email already in use. Please log in or use a new email.',
          'EMAIL_IN_USE'
        );
      } else {
        return User.query().insert({
          email: username,
          password: bcrypt.hashSync(password, 12)
        });
      }
    })
    .then(() => {
      return User.query()
        .select('id')
        .where({ email: username })
        .first();
    })
    .catch((err: Error) => {
      if (!(err instanceof LoginError)) {
        const newErr = new DatabaseError(err.message, 'DB_ERROR');
        newErr.stack = err.stack;
        err = newErr;
      }
      throw err as LoginError;
    });
}

export function update() {}

/**
 * function to make sure password matches confirmation password and matches all criteria for the website
 * @param {string} password
 * @param {string} confPass
 * @returns {Promise<{} | DatabaseError>
 */
function verifyPassword(password: string, confPass: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Your password must be at least eight (8) characters long.');
    }
    if (password !== confPass) {
      errors.push('Confirmation password does not match.');
    }
    if (!/[A-Z]+/.test(password)) {
      errors.push(
        'Your password must contain at least one uppercase character.'
      );
    }
    if (!/[a-z]+/.test(password)) {
      errors.push(
        'Your password must contain at least one lowercase character.'
      );
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
      reject(new LoginError(errorMsg, 'BAD_PASS'));
    }
    resolve();
  });
}
