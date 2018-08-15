export function catchAll(req, res, next) {
  const err = new Error(
    `${req.ip} tried to access ${req.originalUrl} at ${
      new Date(Date.now()).toISOString
    }.`
  );
  next(err);
}
