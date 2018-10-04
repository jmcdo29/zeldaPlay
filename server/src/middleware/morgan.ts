import * as morgan from 'morgan';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

export const myMorgan = morgan(morganFormat);
