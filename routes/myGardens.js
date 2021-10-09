import { Router } from 'express';

// controllers
import {
    getGardens,
    addMyGarden,
    getMyGardenByID,
    updateMyGardenByID,
    deleteMyGardenByID
} from '../controllers/myGardensList.js';

// router init
const myGardensRouter = Router({ mergeParams: true });

//static routes
myGardensRouter.route('/').get(getGardens).post(addMyGarden);

// dynamic routes
myGardensRouter.route('/:id').get(getMyGardenByID).put(updateMyGardenByID).delete(deleteMyGardenByID);

export default myGardensRouter;
