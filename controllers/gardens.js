import Garden from "../models/Garden.js";

export const getGardens = async (req, res, next) => {
  const gardens = await Garden.find(req.query)
    .populate("plants", "-__v")
    .populate("user", "-__v");
  res.status(200).send(gardens);
};
export const getSingleGarden = async (req, res, next) => {
  const { id } = req.params;
  const garden = await Garden.findById(id).populate("plants");
  res.status(200).send(garden);
};

export const addGarden = async (req, res, next) => {
  const newGarden = new Garden(req.body);
  await newGarden.save();
  res.status(201).send(newGarden);
};

export const addPlantToGarden = async (req, res, next) => {
  const { id } = req.params;
  const garden = await Garden.findById(id);
  const { plants } = req.body;
  garden.plants.push(plants);
  await garden.save();
  res.status(200).send(garden);
};

export const removePlantFromGarden = async (req, res, next) => {
  const { id } = req.params;
  const garden = await Garden.findById(id);
  const { plants } = req.body;
  const index = garden.plants.indexOf(plants);
  console.log(garden.plants);
  if (index >= 0) {
    garden.plants.splice(index, 1);
    await garden.save();
  }
  res.status(200).send(garden);
};
