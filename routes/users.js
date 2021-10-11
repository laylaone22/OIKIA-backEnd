import { Router } from 'express';
import { addUser, getUsers, loginUser, deleteUser, updateUser, getSingleUser } from '../controllers/users.js';

import validateWith from '../middleware/validation.js';

import { validationRulesPOST, validationRulesPUT } from '../helpers/validationRule.js';
import { verifyLogin } from '../middleware/auth.js';

// routers to merge
import myPlantsRouter from './myPlants.js';
import myGardensRouter from './myGardens.js';

const userRouter = Router();

userRouter.route('/').get(verifyLogin, getUsers); // verifyAdmin ==> if admin implemented (but not yet)

userRouter
    .route('/:id')
    .get(verifyLogin, getSingleUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .put(verifyLogin, validateWith(validationRulesPUT), updateUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .delete(verifyLogin, deleteUser); // verifyIsUserOrAdmin ==> if admin implemented (but not yet)

// merged params route to get myPlants for one user by userID!!!!
userRouter.use('/:userID/myplants', myPlantsRouter);

// merged params route to get myGardens for one user by userID!!!!
userRouter.use('/:userID/mygardens', myGardensRouter);

// New Endpoint for signing up
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);

// New Endpoint for signing in
userRouter.route('/login').post(loginUser);

export default userRouter;
