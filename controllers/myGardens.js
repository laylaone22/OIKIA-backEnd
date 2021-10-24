import createError from 'http-errors';

// model
import MyGarden from '../models/myGardens.js';

//// controllers

// GET all MyGardens
// fetch from here http://localhost:3000/mygardens
// or
// GET only MyGardens for a user
// fetch from here http://localhost:3000/:userID/mygardens
// this works because we merged params between user and MyGardens routers!!!
export const getGardens = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const query = userID ? { userID } : {};
        const gardens = await MyGarden.find(query)
            .populate('myGardenPlants', '-__v -createdAt -updatedAt')
            .populate({
                path: 'myGardenPlants',
                populate: { path: 'plantID', model: 'Plant', select: '-__v' }
            })
            .select('-__v');
        res.status(200).send(gardens);
    } catch (err) {
        next(err);
    }
};

// POST one myGarden
// fetch to here http://localhost:3000/mygardens
export const addMyGarden = async (req, res, next) => {
    try {
        const newGarden = new MyGarden(req.body);
        await newGarden.save();
        const createdGarden = await MyGarden.findById(newGarden._id)
            .populate('userID', 'name email')
            .populate('myGardenPlants', '-__v -createdAt -updatedAt');
        res.status(201).send(createdGarden);
    } catch (err) {
        next(err);
    }
};

// GET one myGarden based on garden id
// fetch to here http://localhost:3000/mygardens/:id
export const getMyGardenByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const garden = await MyGarden.findById(id)
            .populate('myGardenPlants', '-__v -createdAt -updatedAt')
            .populate({
                path: 'myGardenPlants',
                populate: { path: 'plantID', model: 'Plant', select: '-__v' }
            })
            .select('-__v');
        if (!garden) throw new createError.NotFound();
        res.status(200).send(garden);
    } catch (err) {
        next(err);
    }
};

// PUT one myGarden based on garden id
// fetch to here http://localhost:3000/mygardens/:id
export const updateMyGardenByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await MyGarden.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE one myGarden based on garden id
// fetch to here http://localhost:3000/mygardens/:id
export const deleteMyGardenByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await MyGarden.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(200).send(deleted);
    } catch (err) {
        next(err);
    }
};
