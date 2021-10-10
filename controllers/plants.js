import Plant from "../models/Plant.js";

export const getPlants = async (req, res, next) => {
  const plants = await Plant.find(req.query);
  res.status(200).send(plants);
};

export const addPlant = async (req, res, next) => {
  try {
    const newPLant = new Plant(req.body);
    await newPLant.save();
    res.send(newPLant);
  } catch (err) {
    next(err);
  }
};

export const getSinglePlant = async (req, res, next) => {
  const { id } = req.params;
  const plant = await Plant.findById(id);
  res.status(200).send(plant);
};
