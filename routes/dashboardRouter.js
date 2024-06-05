import { Router } from 'express';
import authenticate from '../helpers/authenticate.js';
import { bodyValidator } from '../decorators/bodyValidator.js';
import newDashBoard from '../schemas/dashboardSchemas.js';
import dashboardController from '../controllers/dashboardController.js';
import isValidIdbyKey from '../helpers/isValidIdByKey.js';

const router = Router();

router.post(
  '/createboard',
  authenticate,
  bodyValidator(newDashBoard),
  dashboardController.createBoard,
);

router.get('/boards', authenticate, dashboardController.fetchAllBoards);

router.get(
  '/:boardId',
  authenticate,
  isValidIdbyKey('boardId'),
  dashboardController.getBoardById,
);

export default router;
