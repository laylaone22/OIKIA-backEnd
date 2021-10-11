import { Router } from 'express';

// controllers
import {
    getMyPlant,
    addMyPlant,
    getMyPlantByID,
    updateMyPlantByID,
    deleteMyPlantByID
} from '../controllers/myPlants.js';

// router init
const myPlantRouter = Router({ mergeParams: true });

// static routes
myPlantRouter.route('/').get(getMyPlant).post(addMyPlant);

// dynamic routes
myPlantRouter.route('/:id').get(getMyPlantByID).put(updateMyPlantByID).delete(deleteMyPlantByID);

export default myPlantRouter;
