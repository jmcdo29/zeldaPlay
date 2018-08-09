// TODO: Add JSDoc documentation for file.
import { NextFunction, Request, Response, Router } from 'express';

import {
  login as getUser,
  signUp as createUser
} from '../services/user.service';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

export { router as UserRouter };

function login(req: Request, res: Response, next: NextFunction) {
  getUser(req.body.username, req.body.password)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
}

function signup(req: Request, res: Response, next: NextFunction) {
  createUser(req.body.username, req.body.password, req.body.confPass)
    .then((user) => {
      res.status(200).json(user.id);
    })
    .catch(next);
}
