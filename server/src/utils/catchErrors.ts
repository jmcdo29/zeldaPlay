import { logger } from './logger';
export function catchAll(req, res, next) {
  logger.debug('In catch all');
  const err = new Error(
    `${req.ip} tried to access ${req.originalUrl} at ${
      new Date(Date.now()).toISOString
    }.`
  );
  next(err);
}
