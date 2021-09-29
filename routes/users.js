import { Router } from 'express';
import { addUser, getUsers, userLogin } from '../controllers/users.js';

import validateWith from '../middleware/validation.js';
import { validationRulesPOST } from '../helpers/validationRules.js';

const userRouter = Router();
userRouter.route('/').get(getUsers).post(addUser);
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);
userRouter.route('/login').post(userLogin);

export default userRouter;
