import { CorsMiddleware } from '@nest-middlewares/cors';

const corsOpts = {
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'https://zeldaplay.herokuapp.com'
  ],
  credentials: true
};

CorsMiddleware.configure(corsOpts);

export const MyCors = CorsMiddleware;
