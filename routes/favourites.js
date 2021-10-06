import { Router } from 'express';

import { addFavourites, getFavourites, deleteFavourites, updateFavourites } from '../controllers/favourites.js';

const favouritesRouter = Router();

favouritesRouter.route('/').post(addFavourites).get(getFavourites).delete(deleteFavourites).put(updateFavourites);

export default favouritesRouter;
