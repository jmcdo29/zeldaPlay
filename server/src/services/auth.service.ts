import { NextFunction, Request, Response } from 'express';
import { consoleLogger as scribe } from 'mc-scribe';

import { verifyToken } from '../utils/jwt';

export function verifyUserLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  scribe(
    'INFO',
    'Session',
    req.session,
    'Session.user',
    req.session.user,
    'Session[user]',
    req.session['user']
  );
  if (req.session['user']) {
    next();
  }
  next(new Error('User not logged in.'));
}

export function verifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    scribe('INFO', 'Verifying the token.');
    scribe('DEBUG', req.headers.authorization);
    verifyToken(req.headers.authorization.split(' ')[1], {
      id: req.params.userId,
      url: req.hostname
    });
    scribe('INFO', 'Token has been verified.');
    next();
  } catch (err) {
    next(err);
  }
}
