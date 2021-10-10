import { Router } from "express";
import {
  getGardens,
  addGarden,
  addPlantToGarden,
  getSingleGarden,
  removePlantFromGarden,
} from "../controllers/gardens.js";

const gardenRouter = Router();

gardenRouter.route("/").get(getGardens).post(addGarden);
gardenRouter
  .route("/:id")
  .put(addPlantToGarden)
  .patch(removePlantFromGarden)
  .get(getSingleGarden);

export default gardenRouter;
