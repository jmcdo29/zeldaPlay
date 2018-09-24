import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../utils/jwt';

export function verifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    verifyToken(req.headers.authorization, {
      id: req.params.userId,
      url: req.hostname
    });
    next();
  } catch (err) {
    next(err);
  }
}
