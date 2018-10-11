import { MorganMiddleware } from '@nest-middlewares/morgan';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

MorganMiddleware.configure(morganFormat);

export const MyMorgan = MorganMiddleware;
