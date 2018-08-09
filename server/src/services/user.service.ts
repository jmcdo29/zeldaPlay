// TODO: Add JSDoc documentation for file.
import * as bcrypt from 'bcryptjs';
import { User } from '../db/models/user_schema';
import { DatabaseError } from '../utils/errors/DatabaseError';
import { LoginError } from '../utils/errors/LoginError';

export function login(username: string, password: string) {
  return User.query()
    .findOne({ email: username })
    .select('id', 'password')
    .then((user) => {
      if (!user) {
        throw new LoginError(
          'Username or password is incorrect',
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
      throw err;
    });
}

export function signUp(
  username: string,
  password: string,
  confPassword: string
) {
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
      throw err;
    });
}

export function update() {}

function verifyPassword(password: string, confPass: string) {
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
