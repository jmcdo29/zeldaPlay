import { NextFunction, Request, Response } from 'express';
import { consoleLogger as scribe } from 'mc-scribe';

import { verifyToken } from '../utils/jwt';

export function verifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    scribe('INFO', 'Verifying the token.');
    verifyToken(req.headers.authorization, {
      id: req.params.userId,
      url: req.hostname
    });
    scribe('INFO', 'Token has been verified.');
    next();
  } catch (err) {
    next(err);
  }
}
