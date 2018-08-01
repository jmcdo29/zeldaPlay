const customErrors = {};

class LoginError extends Error {
  constructor(message, reasonCode) {
    super();
    this.message = message;
    this.reasonCode = reasonCode;
    Error.captureStackTrace(this, LoginError);
  }
}

class DatabaseError extends Error {
  constructor(message, reasonCode) {
    super();
    this.message = message;
    this.reasonCode = reasonCode;
    Error.captureStackTrace(this, DatabaseError);
  }
}

customErrors.LoginError = LoginError;
customErrors.DatabaseError = DatabaseError;

module.exports = customErrors;
