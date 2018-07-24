const router = require('express').Router();
const characterService = require('../services/character.service');

router.get('/characters', allCharacters);
router.get('/characters/:id', getCharacter);
router.get('/characters/user/:userId', getUserCharacters);
router.post('/characters/:id', upsertCharacter);
router.post('/characters', newCharacter);

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
  console.log(req.params.id);
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
  characterService.updateOne(req.params.id, {})
    .then(character => {
      console.log(character);
      res.status(200).json(character);
    })
    .catch(err => {
      res.status(400).json(err.message);
    })
}

function newCharacter(req, res) {
  console.log(req.body.character);
}

function getUserCharacters(req, res) {
  console.log(req.params.userId);
}