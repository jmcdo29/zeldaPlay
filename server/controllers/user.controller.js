const router = require('express').Router();

const userService = require('../services/user.service');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;

function login(req, res) {
  userService.getUser(req.body.username, req.body.password)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(403).json(err.message);
    })
}

function signup(req, res) {
  userService.createUser(req.body.username, req.body.password, req.body.confPass)
    .then(user => {
      res.status(200).json(user.id);
    })
    .catch(err => {
      res.status(403).json(err.message);
    })
}