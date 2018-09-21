import { Response } from 'express';

export function sendApp(_, res: Response, next: any) {
  (res as Response).sendFile('./index.html');
  next();
}
