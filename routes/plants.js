import { Router } from 'express';

// controllers
import { getPlants, addPlant, getPlantByID, getPlantsByType } from '../controllers/plants.js';

// router init
const plantsRouter = Router();

// static routes
plantsRouter.route('/').get(getPlants).post(addPlant);

// dynamic routes
plantsRouter.route('/plantcyclopedia/id/:id').get(getPlantByID);
plantsRouter.route('/plantcyclopedia/type/:type').get(getPlantsByType);

export default plantsRouter;
