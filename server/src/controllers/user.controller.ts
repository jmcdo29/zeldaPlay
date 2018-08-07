import { Router } from 'express';

import { login as getUser, signUp as createUser} from '../services/user.service';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

export {router as UserRouter };

function login(req, res, next) {
  getUser(req.body.username, req.body.password)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
}

function signup(req, res, next) {
  createUser(req.body.username, req.body.password, req.body.confPass)
    .then(user => {
      res.status(200).json(user.id);
    })
    .catch(next);
}
