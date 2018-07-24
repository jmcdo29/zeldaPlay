const router = require('express').Router();

const userService = require('../services/user.service');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;

function login(req, res) {
  userService.getUser(req.body.username, req.body.password)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.error(err.stack);
      res.status(403).json(err.message);
    })
}

function signup(req, res) {
  userService.createUser(req.body.username, req.body.password, req.body.confPass)
    .then(user => {
      console.log('USER');
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log('ERROR');
      console.log(err.message);
      console.log(err.stack);
      res.status(403).json(err.message);
    })
}