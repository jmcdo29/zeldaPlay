import { NextFunction, Request, Response } from 'express';

export function catchAll(req: Request, res: Response, next: NextFunction) {
  const err = new Error(
    `${req.ip} tried to access ${req.originalUrl} at ${
      new Date(Date.now()).toISOString
    }.`
  );
  next(err);
}
