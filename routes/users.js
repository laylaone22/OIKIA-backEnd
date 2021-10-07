import { Router } from 'express';
import { addUser, getUsers, loginUser, deleteUser, updateUser, getSingleUser } from '../controllers/users.js';

// import from favourites controllers
import { getFavorites, addFavorite, updateFavorites } from '../controllers/favorites.js';

import validateWith from '../middleware/validation.js';

import { validationRulesPOST, validationRulesPUT } from '../helpers/validationRule.js';
import { verifyLogin } from '../middleware/auth.js';

const userRouter = Router();

//verifyLogin,
userRouter.route('/').get(verifyLogin, getUsers); // verifyAdmin ==> if admin implemented (but not yet)

userRouter
    .route('/:id')
    .get(verifyLogin, getSingleUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .put(verifyLogin, validateWith(validationRulesPUT), updateUser) // verifyIsUserOrAdmin ==> if admin implemented (but not yet)
    .delete(verifyLogin, deleteUser); // verifyIsUserOrAdmin ==> if admin implemented (but not yet)

// New Endpoint for signing up
userRouter.route('/signup').post(validateWith(validationRulesPOST), addUser);

// New Endpoint for signing in
userRouter.route('/login').post(loginUser);

// new Endpoint for favourites inside the user route
userRouter.route('/favourites').get(getFavorites).post(verifyLogin, addFavorite);
userRouter.route('/favourites/:id').put(verifyLogin, updateFavorites);

export default userRouter;
