import { Router } from 'express';

// controllers
import {
    getMyFavoritesLists,
    addMyFavoritesList,
    getMyFavoritesListByID,
    updateMyFavoritesListByID,
    deleteMyFavoritesListByID
} from '../controllers/myFavoritesList.js';

// router init
const myFavoritesListRouter = Router({ mergeParams: true });

// static routes
myFavoritesListRouter.route('/').get(getMyFavoritesLists).post(addMyFavoritesList);

// dynamic routes
myFavoritesListRouter
    .route('/:id')
    .get(getMyFavoritesListByID)
    .put(updateMyFavoritesListByID)
    .delete(deleteMyFavoritesListByID);

export default myFavoritesListRouter;
