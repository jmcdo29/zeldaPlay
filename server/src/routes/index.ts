import { CharacterRouter } from './character.controller';
import { UserRouter } from './user.controller';

export function useRoutes(app) {
  CharacterRouter(app, '/api/character');
  UserRouter(app, '/user');
}
