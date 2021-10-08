import { Router } from 'express';

// controllers
import {
    getMyPlantsLists,
    addMyPlantsList,
    getMyPlantsListByID,
    updateMyPlantsListByID,
    deleteMyPlantsListByID
} from '../controllers/myPlantsList.js';

// router init
const myPlantsListRouter = Router({ mergeParams: true });

// static routes
myPlantsListRouter.route('/').get(getMyPlantsLists).post(addMyPlantsList);

// dynamic routes
myPlantsListRouter.route('/:id').get(getMyPlantsListByID).put(updateMyPlantsListByID).delete(deleteMyPlantsListByID);

export default myPlantsListRouter;
