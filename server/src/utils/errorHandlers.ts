import { DatabaseError } from './ErrorObjects';
import { LoginError } from './ErrorObjects';
import { DBError } from '../db/models/error_schema';

export function logErrors (err, req, res, next) {
  console.error(err.stack);
  DBError.query().insert({
    message: err.message,
    stack: err.stack.split('\n')[0],
    code: err.reasonCode ? err.reasonCode : 'GENERAL'
  }).then(next(err));
}

export function badLogIn (err, req, res, next) {
  if (err instanceof LoginError) {
    console.log(err.reasonCode);
    return res.status(403).send({message: err.message});
  } else {
    next(err);
  }
}

export function databaseProblem(err, req, res, next) {
  if (err instanceof DatabaseError) {
    console.log(err.reasonCode);
    return res.status(400).send({message: err.message});
  } else {
    next(err);
  }
}

export function generalError(err, req, res, next) {
  return res.status(500).send({message: err.message});
}
