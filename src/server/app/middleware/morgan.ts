import { MorganMiddleware } from '@nest-middlewares/morgan';
import { scribe } from 'mc-scribe';

const morganFormat =
  process.env.NODE_ENV.toLowerCase() === 'production' ? 'combined' : 'dev';

MorganMiddleware.configure(morganFormat, {
  skip: (req, res) => morganFormat === 'combined' && req.statusCode < 400,
  stream: {
    write: (value) => scribe('INFO', value)
  }
});

export const MyMorgan = MorganMiddleware;
