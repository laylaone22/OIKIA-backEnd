import createError from 'http-errors';

// model
import MyPlant from '../models/myPlant.js';

//// controllers

// GET all MyPlants
// fetch from here http://localhost:3000/myplants
// or
// GET only MyPlants for a user
// fetch from here http://localhost:3000/users/:userID/myplants
// this works because we merged params between user and myPlants routers!!!
export const getMyPlant = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const query = userID ? { userID } : {};
        const plant = await MyPlant.find(query)
            .populate('userID', 'name email')
            .populate('gardenID', '-__v -createdAt -updatedAt')
            .populate('plantID', '-__v -createdAt -updatedAt');
        res.status(200).send(plant);
    } catch (err) {
        next(err);
    }
};

// POST one MyPlant
// fetch to here http://localhost:3000/myplants
export const addMyPlant = async (req, res, next) => {
    try {
        const newPlant = new MyPlant(req.body);
        await newPlant.save();
        res.status(201).send(newPlant);
    } catch (err) {
        next(err);
    }
};

// GET one MyPlants based on myPlantID
// fetch from here http://localhost:3000/myplants/:id
export const getMyPlantByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await MyPlant.findById(id)
            .populate('userID', 'name email')
            .populate('gardenID', '-__v -createdAt -updatedAt')
            .populate('plantID', '-__v -createdAt -updatedAt');
        if (!list) throw new createError.NotFound();
        res.status(200).send(list);
    } catch (err) {
        next(err);
    }
};

// PUT one MyPlants based on myPlantID
// fetch from here http://localhost:3000/myplants/:id
export const updateMyPlantByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await MyPlant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE one MyPlants based on myPlantID
// fetch from here http://localhost:3000/myplants/:id
export const deleteMyPlantByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await MyPlant.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(200).send(deleted);
    } catch (err) {
        next(err);
    }
};
