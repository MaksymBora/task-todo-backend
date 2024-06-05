import { Router } from 'express';
import schema from '../schemas/userSchemas.js';
import { bodyValidator } from '../decorators/bodyValidator.js';
import authController from '../controllers/authController.js';
import authenticate from '../helpers/authenticate.js';

const router = Router();

router.post(
  '/signup',
  bodyValidator(schema.registration),
  authController.signup,
);

router.post('/signin', bodyValidator(schema.login), authController.signin);

router.post('/signout', authenticate, authController.signout);

router.get(
  '/current',
  authenticate,
  bodyValidator(schema.current),
  authController.current,
);

router.post('/logout', authenticate, authController.signout);

export default router;
