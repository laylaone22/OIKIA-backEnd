import { Router } from "express";
import { getPlants, addPlant, getSinglePlant } from "../controllers/plants.js";

const plantRouter = Router();

plantRouter.route("/").get(getPlants).post(addPlant);
plantRouter.route("/:id").get(getSinglePlant);

export default plantRouter;
