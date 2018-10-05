import { Express, NextFunction, Request, Response, Router } from 'express';
import { consoleLogger as scribe } from 'mc-scribe';

import { User } from '../db/entities/user_schema';
import {
  login as getUser,
  signUp as createUser
} from '../services/user.service';
import { DatabaseError } from '../utils/errors/DatabaseError';
import { LoginError } from '../utils/errors/LoginError';
import { signToken } from '../utils/jwt';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

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
      id: user.id,
      url: req.hostname
    });
    serializeUser(req, user);
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
      url: req.hostname
    });
    serializeUser(req, user);
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

async function logout(req: Request, res: Response, next: NextFunction) {
  scribe('DEBUG', 'logging out');
  scribe(
    'DEBUG',
    'headers[cookie]',
    req.headers['cookie'],
    'session',
    req.session
  );
  req.session.destroy(() => {});
  scribe('DEBUG', 'logged out');
  scribe(
    'DEBUG',
    'headers[cookie]',
    req.headers['cookie'],
    'session',
    req.session
  );
  res.status(200);
  next();
}

function serializeUser(req: Request, user: Partial<User>): void {
  req.session['user'] = user.id;
  scribe('DEBUG', 'session', req.session);
  scribe('DEBUG', 'sessionID', req.session.id);
}
