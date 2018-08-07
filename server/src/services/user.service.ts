import { User } from '../db/models/user_schema';
import * as bcrypt from 'bcryptjs';
import { LoginError } from '../utils/ErrorObjects';


export function login(username, password) {
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
    });
}

export function signUp(username, password, confPassword) {
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
    });
}

export function update() {}

function verifyPassword(password, confPass) {
  return new Promise((resolve, reject) => {
    const errors = [];
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
