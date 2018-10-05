import { sendApp } from '../utils/sendApp';
import { CharacterRouter } from './character.controller';
import { UserRouter } from './user.controller';

export function useRoutes(app) {
  app.get('/', sendApp);
  CharacterRouter(app, '/api');
  UserRouter(app, '/users');
}
