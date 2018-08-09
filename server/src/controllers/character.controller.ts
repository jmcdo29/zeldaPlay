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

/**
 * Function for retrieving all character. Called when viewing homepage, but not logged in
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
function allCharacters(req: Request, res: Response, next: NextFunction) {
  getAll()
    .then((characters) => {
      res.json(characters);
    })
    .catch(next);
}

/**
 * Function for retrieving one character. Called when clicking specified character
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
function getCharacter(req: Request, res: Response, next: NextFunction) {
  getOne(req.params.id)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch(next);
}

/**
 * Function for retrieving updating one character. Called when click "save to database"
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
function upsertCharacter(req: Request, res: Response, next: NextFunction) {
  updateOne(req.params.userId, req.body.character)
    .then((character) => {
      res.status(200).json(character);
    })
    .catch(next);
}

/**
 * Function for retrieving all of one user's character. Called when viewing homepage and not logged in
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Next function for handling errors
 */
function getUserCharacters(req: Request, res: Response, next: NextFunction) {
  getUserDBCharacter(req.params.userId)
    .then((characters) => {
      res.status(200).json(characters);
    })
    .catch(next);
}
