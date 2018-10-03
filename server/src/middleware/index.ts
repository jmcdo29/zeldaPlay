import { Express } from 'express';

import { catchAll as unknownPath } from './catchErrors';
import { myCors } from './cors';
import * as errorHandlers from './errorHandlers';
import { myExpress } from './express';
import { myHelmet } from './helmet';
import { myMorgan } from './morgan';
import { mySession } from './session';

export function useMiddleware(app: Express) {
  app.use(myHelmet);
  app.use(myCors);
  app.use(myMorgan);
  app.use(myExpress.eJSON);
  app.use(myExpress.eURL);
  app.use(myExpress.eStatic);
  app.use(mySession);
}

export function useErrorHandlers(app: Express) {
  app.get('*', unknownPath);
  app.use(errorHandlers.logErrors);
  app.use(errorHandlers.badLogIn);
  app.use(errorHandlers.databaseProblem);
  app.use(errorHandlers.generalError);
}
