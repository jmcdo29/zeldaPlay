import { Router } from 'express';
import {getAll, getOne, getUserCharacters as getUserDBCharacter, newWeapon, updateOne} from '../services/character.service';

const router = Router();

router.get('/characters', allCharacters);
router.get('/characters/:id', getCharacter);
router.get('/characters/user/:userId', getUserCharacters);
router.post('/characters/:userId', upsertCharacter);

export { router as CharacterRouter };

function allCharacters(req, res, next) {
  getAll()
    .then(characters => {
      res.json(characters);
    })
    .catch(next);
}

function getCharacter(req, res, next) {
  getOne(req.params.id)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(next);
}

function upsertCharacter(req, res, next) {
  updateOne(req.params.userId, req.body.character)
    .then(character => {
      console.log('response');
      console.log(character);
      res.status(200).json(character);
    })
    .catch(next);
}

function getUserCharacters(req, res, next) {
  getUserDBCharacter(req.params.userId)
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(next);
}
