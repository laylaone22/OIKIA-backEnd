import { Router } from 'express';
import { addUser, getUsers, loginUser, deleteUser, updateUser, getSingleUser } from '../controllers/users.js';

import validateWith from '../middleware/validation.js';

import { validationRulesPOST, validationRulesPUT } from '../helpers/validationRule.js';
import { verifyLogin } from '../middleware/auth.js';

// myFavoritesList router to merge
import myFavoritesListRouter from '../routes/myFavoritesList.js';
import myPlantsListRouter from '../routes/myPlantsList.js';
import myGardensRouter from './myGardens.js';

const userRouter = Router();

userRouter.route('/').get(verifyLogin, getUsers); // verifyAdmin ==> if admin implemented (but not yet)

userRouter
    .route('/:id')
    .get(verifyLogin, getSingleUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .put(verifyLogin, validateWith(validationRulesPUT), updateUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .delete(verifyLogin, deleteUser); // verifyIsUserOrAdmin ==> if admin implemented (but not yet)

// merged params route to get myFavoritesList for one user by userID!!!!
userRouter.use('/:userID/myfavoriteslist', myFavoritesListRouter);

// merged params route to get myPlantsList for one user by userID!!!!
userRouter.use('/:userID/myplantslist', myPlantsListRouter);

// merged params route to get myGardensList for one user by userID!!!!
userRouter.use('/:userID/mygardens', myGardensRouter);

// New Endpoint for signing up
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);

// New Endpoint for signing in
userRouter.route('/login').post(loginUser);

export default userRouter;
