import { Express, NextFunction, Request, Response, Router } from 'express';

import { signToken } from '../utils/jwt';

import {
  login as getUser,
  signUp as createUser
} from '../services/user.service';
import { DatabaseError } from '../utils/errors/DatabaseError';
import { LoginError } from '../utils/errors/LoginError';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

export function UserRouter(app: Express, path: string) {
  app.use(path, router);
}

/**
 * Route for processing login requests
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUser(req.body.username, req.body.password);
    const jwt = signToken({
      id: user,
      url: req.hostname
    });
    res.status(200).send({ token: jwt, id: user });
  } catch (err) {
    if (!(err instanceof LoginError)) {
      const newErr = new DatabaseError(err.message, 'DB_ERROR');
      newErr.stack = err.stack;
      err = newErr;
    }
    next(err);
  }
}

/**
 * Route for processing signup requests
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(
      req.body.username,
      req.body.password,
      req.body.confPass
    );
    const jwt = signToken({
      id: user.id,
      url: req.baseUrl
    });
    res.status(200).send({ token: jwt, id: user.id });
  } catch (err) {
    if (!(err instanceof LoginError)) {
      const newErr = new DatabaseError(err.message, 'DB_ERROR');
      newErr.stack = err.stack;
      err = newErr;
    }
    next(err);
  }
}
