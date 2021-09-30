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

/*
// find
router.get("/", (req, res) => {
  Plants.find()
    .then(plants => {
      res.json(plants);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get plants." });
    });
});
// GET http://localhost:5000/api/plants

// findById
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plants.findById(id)
    .then(plant => {
      if (plant) {
        res.json(plant);
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given ID." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get Plant." });
    });
});
// GET http://localhost:5000/api/plants/2 tested in POSTMAN

// add
router.post("/", (req, res) => {
  const plantData = req.body;

  Plants.add(plantData)
    .then(plant => {
      res.status(201).json(plant);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to add new plant." });
    });
});
// POST http://localhost:5000/api/plants tested in Postman

// update Plants
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Plants.findById(id)
    .then(plant => {
      if (plant) {
        Plants.update(changes, id).then(updatedPlant => {
          res.json(updatedPlant);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update plant." });
    });
});
// PUT http://localhost:5000/api/plants/3 tested in Postman

// remove
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Plants.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find plant with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to delete plant." });
    });
});
// DELETE http://localhost:5000/api/plants/3 tested in Postman

export default PlantsRouter;
*/
