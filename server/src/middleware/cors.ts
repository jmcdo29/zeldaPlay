import * as cors from 'cors';

const corsOptions: cors.CorsOptions = {
  origin: [
    'http://localhost:4200',
    'http://localhost:4000',
    'https://zeldaplay/herokuapp.com'
  ],
  credentials: true
};

export const myCors = cors(corsOptions);
