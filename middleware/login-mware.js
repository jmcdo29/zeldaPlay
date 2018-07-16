const bcrypt = require('bcryptjs');

function verifyPas (res, res, next) {
  const pass = req.body.password;
  const confPass = req.body.confPassword;
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
    req.flash('errors', errors);
    res.redirect('/signup');
  }
  next();
}