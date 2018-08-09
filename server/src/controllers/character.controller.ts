// TODO: Add JSDoc documentation for file.
import { NextFunction, Request, Response, Router } from 'express';
import {
  getAll,
  getOne,
  getUserCharacters as getUserDBCharacter,
  newWeapon,
  updateOne
} from '../services/character.service';

const router = Router();

router.get('/characters', allCharacters);
router.get('/characters/:id', getCharacter);
router.get('/characters/user/:userId', getUserCharacters);
router.post('/characters/:userId', upsertCharacter);

export { router as CharacterRouter };

function allCharacters(req: Request, res: Response, next: NextFunction) {
  getAll()
    .then((characters) => {
      res.json(characters);
    })
    .catch(next);
}

function getCharacter(req, res, next) {
  getOne(req.params.id)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch(next);
}

function upsertCharacter(req: Request, res: Response, next: NextFunction) {
  updateOne(req.params.userId, req.body.character)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch(next);
}

function getUserCharacters(req: Request, res: Response, next: NextFunction) {
  getUserDBCharacter(req.params.userId)
    .then((characters) => {
      res.status(200).json(characters);
    })
    .catch(next);
}
