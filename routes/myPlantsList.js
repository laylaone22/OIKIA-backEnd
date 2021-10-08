import { Router } from 'express';

// controllers
//import { getMyPlantsLists, addMyPlantsList, getMyPlantsListByID, updateMyPlantsListByID, deleteMyPlantsListByID } from '../controllers/myPlantsList.js';

// router init
const myPlantsListRouter = Router();

// static routes
//myPlantsRouter.route('/').get(getMyPlantsLists).post(addMyPlantsList);

/*
// dynamic routes
myPlantsRouter.route('/:id').get(getMyPlantsListByID).put(updateMyPlantsListByID).delete(deleteMyPlantsListByID);

*/
export default myPlantsListRouter;
