import { Router } from 'express';
import { addUser, getUsers, loginUser, deleteUser, updateUser, getSingleUser } from '../controllers/users.js';

import validateWith from '../middleware/validation.js';

import { validationRulesPOST, validationRulesPUT } from '../helpers/validationRule.js';
import { verifyLogin, verifyAdmin, verifyIsUserOrAdmin } from '../middleware/auth.js';

const userRouter = Router();

userRouter.route('/').get(verifyLogin, verifyAdmin, getUsers);

userRouter
    .route('/:id')
    .get(verifyLogin, verifyIsUserOrAdmin, getSingleUser)
    .put(verifyLogin, verifyIsUserOrAdmin, validateWith(validationRulesPUT))
    .delete(verifyLogin, verifyIsUserOrAdmin, deleteUser);

// New Endpoint for signing up
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);

// New Endpoint for signing in
userRouter.route('/login').post(loginUser);

export default userRouter;
