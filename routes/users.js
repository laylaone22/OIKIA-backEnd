import { Router } from 'express';
import { addUser, getUsers, loginUser, deleteUser, updateUser, getSingleUser } from '../controllers/users.js';

import validateWith from '../middleware/validation.js';

import { validationRulesPOST, validationRulesPUT } from '../helpers/validationRule.js';
import { verifyLogin } from '../middleware/auth.js';

const userRouter = Router();

//verifyLogin,
userRouter.route('/').get(getUsers); // verifyAdmin ==> if admin implemented (but not yet)

userRouter
    .route('/:id')
    .get(getSingleUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .put(validateWith(validationRulesPUT), updateUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .delete(deleteUser); // verifyIsUserOrAdmin ==> if admin implemented (but not yet)

// New Endpoint for signing up
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);

// New Endpoint for signing in
userRouter.route('/login').post(loginUser);

export default userRouter;
