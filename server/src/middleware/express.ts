import * as express from 'express';
import { join } from 'path';

export const myExpress = {
  eJSON: express.json(),
  eURL: express.urlencoded({ extended: false }),
  eStatic: express.static(join(__dirname, '../../client'))
};
