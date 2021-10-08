import { Router } from 'express';

import { getFavorites, addFavorite, updateFavorites } from '../controllers/favorites.js';
import { verifyLogin } from '../middleware/auth.js';

const favoritesRouter = Router();

favoritesRouter.route('/').get(getFavorites).post(verifyLogin, addFavorite);

favoritesRouter.route('/:id').put(verifyLogin, updateFavorites);

//.delete(deleteFavorites).put(updateFavorites);

export default favoritesRouter;
