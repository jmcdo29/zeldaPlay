const router = require('express').Router();
const characterService = require('../services/character.service');

router.get('/characters', allCharacters);
router.get('/characters/:id', getCharacter);
router.get('/characters/user/:userId', getUserCharacters);
router.post('/characters/:userId', upsertCharacter);

module.exports = router;

function allCharacters(req, res, next) {
  characterService.getAll()
    .then(characters => {
      res.json(characters);
    })
    .catch(next);
}

function getCharacter(req, res, next) {
  characterService.getOne(req.params.id)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(next)
}

function upsertCharacter(req, res, next) {
  characterService.updateOne(req.params.userId, req.body.character)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(next)
}

function getUserCharacters(req, res, next) {
  characterService.getUserCharacters(req.params.userId)
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(next)
}