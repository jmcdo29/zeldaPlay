import { MorganMiddleware } from '@nest-middlewares/morgan';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

export const MyMorganMiddleware = () =>
  MorganMiddleware.configure(morganFormat);
