import plants from "../model/plants.js";

export const getPlants = async (req, res, next) => {
  const plants = await plant.find(req.query).populate(
    "donor",
    "-createdAt -updatedAt -__v'"
  );
  res.send(plants);
};

export const addPlants = async (req, res, next) => {
  try {
    const newPLant = new Food(req.body);
    await newPLant.save();
    res.send(newPLant);
  } catch (err) {
    next(err);
  }
};