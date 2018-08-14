import { NextFunction, Request, Response } from 'express';
import { DBError } from '../db/models/error_schema';
import { DatabaseError } from './errors/DatabaseError';
import { LoginError } from './errors/LoginError';

/**
 * @typedef {Error} MyError
 * @extends {Error} - extends Error type to have access to stack and message
 * @prop {string} [reasonCode] - The short code used internally. Using interface to give possibility to having field reasonCode on error
 */
interface IMyError extends Error {
  reasonCode?: string;
}

/**
 * Custom Error handling generic for all errors
 * @param err The offending error. Can be any type
 * @param req The Express request object
 * @param res The Express response object
 * @param next Callback to the next function
 */
export function logErrors(
  err: IMyError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.message);
  console.error(err.stack);
  DBError.query()
    .insert({
      message: err.message.substring(0, err.message.length < 255 ? err.message.length : 255),
      stack: err.stack.split('\n')[0],
      code: err.reasonCode ? err.reasonCode : 'GENERAL'
    })
    .then(() => next(err));
}

/**
 * Custom error handler specific to Login Errors. If not log in error, go to next function
 * @param err The offending error, from the previous function
 * @param req The Express request object
 * @param res The Express response object
 * @param next Callback to the next function, if err is not of LoginError type
 * @returns {Express.Response} If type of LoginError send a 403 to the client to indicate a login error
 */
export function badLogIn(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response {
  if (err instanceof LoginError) {
    console.log(err.reasonCode);
    return res.status(403).send({ message: err.message });
  } else {
    next(err);
  }
}

/**
 * Custom error handler for handling DatabaseErrors (malformed queries and such). If not a DatabaseError move to next function
 * @param err The offending error object, from previous function
 * @param req the Express request object
 * @param res The Express response object
 * @param next Callback to the next function, if err is not a DatabaseError
 * @returns {Express.Response} If type of DatabaseError send a 400 to the client to indicate database error
 */
export function databaseProblem(
  err: IMyError,
  req: Request,
  res: Response,
  next: NextFunction
): Express.Response {
  if (err instanceof DatabaseError) {
    console.log(err.reasonCode);
    return res.status(400).send({ message: err.message });
  } else {
    next(err);
  }
}

/**
 * Generic error handler, in case somehow there is an error not of Login or Database type
 * @param err Generic Error object, from previous function
 * @param req The Express request object
 * @param res the Express response object
 * @returns {Express.Response} Send the response to the client that there was a server error
 */
export function generalError(
  err: IMyError,
  req: Request,
  res: Response
): Express.Response {
  return res.status(500).send({ message: err.message });
}
