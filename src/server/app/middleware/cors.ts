import { CorsMiddleware } from '@nest-middlewares/cors';

export const MyCorsMiddleware = () =>
  CorsMiddleware.configure({
    origin: [
      'http://localhost:4200',
      'http://localhost:4000',
      'https://zeldaplay/herokuapp.com'
    ],
    credentials: true
  });
