import Plant from "../models/plants.js";

export const getPlants = async (req, res, next) => {
  const plants = await Plant.find(req.query).populate(
    "plant",
    "-createdAt -updatedAt -__v'"
  );
  res.send(plants);
};

export const addPlants = async (req, res, next) => {
  try {
    const newPLant = new Plant(req.body);
    await newPLant.save();
    res.send(newPLant);
  } catch (err) {
    next(err);
  }
};
