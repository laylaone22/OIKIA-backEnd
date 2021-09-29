import Plant from '../models/plants.js';

export const getPlants = async (req, res, next) => {
  const plants = await Plant.find(req.query).populate(
    'donor',
    "-createdAt -updatedAt -__v'"
  );
  res.status(200).send(plants);
};

export const addPlants = async (req, res, next) => {
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    res.status(200).send(newPlant);
  } catch (err) {
    next(err);
  }
};
