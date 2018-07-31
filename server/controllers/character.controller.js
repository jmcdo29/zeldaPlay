const router = require('express').Router();
const characterService = require('../services/character.service');

router.get('/characters', allCharacters);
router.get('/characters/:id', getCharacter);
router.get('/characters/user/:userId', getUserCharacters);
router.post('/characters/:userId', upsertCharacter);

module.exports = router;

function allCharacters(req, res) {
  characterService.getAll()
    .then(characters => {
      res.json(characters);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
}

function getCharacter(req, res) {
  characterService.getOne(req.params.id)
    .then(character => {
      if(!character){
        throw new Error('No character found!');
      }
      res.status(200).json(character);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err.message);
    })
}

function upsertCharacter(req, res) {
  characterService.updateOne(req.params.userId, req.body.character)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err.message);
    })
}

function getUserCharacters(req, res) {
  characterService.getUserCharacters(req.params.userId)
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      console.log(err);
      res.status(403).json(err.message);
    })
}