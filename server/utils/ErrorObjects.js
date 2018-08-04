/**
 * @module utils/ErrorObjects
 */



const customErrors = {};

/**
 * @typedef {class} LoginError
 * @prop {string} reasonCode
 * @prop {string} message
 * @prop {string} stack
 */
class LoginError extends Error {
  /**
   * @param {string} message The message for the error to have
   * @param {string} reasonCode The reason code for the error. For internal use only
   */
  constructor(message, reasonCode) {
    super();
    this.message = message;
    this.reasonCode = reasonCode;
    Error.captureStackTrace(this, LoginError);
  }
}

/**
 * @typedef {class} DatabaseError
 * @prop {string} reasonCode
 * @prop {string} message
 * @prop {string} stack
 */
class DatabaseError extends Error {
  /**
   * @param {string} message The message for the error to have
   * @param {string} reasonCode The reason code for the error. For internal use only
   */
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
