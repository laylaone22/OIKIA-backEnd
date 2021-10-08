import { Router } from 'express';

// controllers
//import { getMyGardensLists, addMyGardensList, getMyGardensListByID, updateMyGardensListByID, deleteMyGardensListByID } from '../controllers/myGardensList.js';

// router init
const myGardensListRouter = Router();

// static routes
//myGardensRouter.route('/').get(getMyGardensLists).post(addMyGardensList);

/*
// dynamic routes
myGardensRouter.route('/:id').get(getMyGardensListByID).put(updateMyGardensListByID).delete(deleteMyGardensListByID);

*/
export default myGardensListRouter;
