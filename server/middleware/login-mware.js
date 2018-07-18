const bcrypt = require('bcryptjs');

const middleware = {};

middleware.verifyPass = verifyPas;

module.exports = middleware;

function verifyPas (password, confPass) {
  return new Promise((resolve, reject) => {
    const errors = [];
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
  if (errors.length > 0) {
    reject(errors);
  }
  resolve();
  });
}