const router = require('express').Router();
const Character = require('../db/models/character_schema');

router
  .get('/characters', (req, res, next) => {
    Character.query()
      .then(characters => {
        res.json(characters);
      })
      .catch(err => {
        console.error(err);
        res.json(err);
      });
  })
  .post('/character/:id', (req, res, next) => {

  })
  .post('/character', (req, res, next) => {

  })
  .get('/user', (req, res, next) => {
    res.send(req.session.userId);
  })
  .post('/user', (req, res, next) => {

  })

module.exports = router;