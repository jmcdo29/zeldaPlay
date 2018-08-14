import { Response } from 'express';
export function sendApp(_, res: Response) {
  (res as Response).sendFile('./index.html');
}
