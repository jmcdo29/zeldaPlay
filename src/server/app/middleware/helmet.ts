import { HelmetMiddleware } from '@nest-middlewares/helmet';

export const MyHelmetMiddleware = () => {
  HelmetMiddleware.configure({});
};
