const DataBaseError = require('./ErrorObjects').DatabaseError;
const LoginError = require('./ErrorObjects').LoginError;
const DBError = require('../db/models/error_schema');
const errors = {};

errors.logErrors = logErrors;
errors.badLogIn = badLogIn;
errors.databaseProblem = databaseProblem;
errors.generalError = generalError;

module.exports = errors;

function logErrors (err, req, res, next) {
  console.error(err.stack);
  DBError.query().insert({
    message: err.message,
    stack: err.stack.split('\n')[0],
    code: err.reasonCode ? err.reasonCode : 'GENERAL'
  }).then();
  next(err);
}

function badLogIn (err, req, res, next) {
  if(err instanceof LoginError){
    console.log(err.reasonCode);
    return res.status(403).send({message: err.message});
  } else {
    next(err);
  }
}

function databaseProblem(err, req, res, next) {
  if( err instanceof DataBaseError) {
    console.log(err.reasonCode);
    return res.status(400).send({message: err.message});
  } else {
    next(err);
  }
}

function generalError(err, req, res, next) {
  return res.status(500).send({message: err.message});
}