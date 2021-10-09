import createError from 'http-errors';

// model
import MyPlantsList from '../models/myPlantsList.js';

//// controllers

// GET all MyPlants lists
// fetch from here http://localhost:3000/myplantslist
// or
// GET only MyPlants lists for a user
// fetch from here http://localhost:3000/:userID/myplantslist
// this works because we merged params between user and myPlants routers!!!
export const getMyPlantsLists = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const query = userID ? { userID } : {};
        const lists = await MyPlantsList.find(query)
            .populate('userID', 'name email')
            .populate('plants', '-__v -createdAt -updatedAt');
        res.status(200).send(lists);
    } catch (err) {
        next(err);
    }
};

// POST one MyPlants list
// fetch to here http://localhost:3000/myplantslist
export const addMyPlantsList = async (req, res, next) => {
    try {
        const newList = new MyPlantsList(req.body);
        await newList.save();
        res.status(201).send(newList);
    } catch (err) {
        next(err);
    }
};

// GET one MyPlants list based on userID
// fetch from here http://localhost:3000/myplantslist/:id
export const getMyPlantsListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await MyPlantsList.findById(id)
            .populate('userID', 'name email')
            .populate('plants', '-__v -createdAt -updatedAt');
        if (!list) throw new createError.NotFound();
        res.status(200).send(list);
    } catch (err) {
        next(err);
    }
};

// PUT one MyPlants list based on userID
// fetch from here http://localhost:3000/myplantslist/:id
export const updateMyPlantsListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await MyPlantsList.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE one MyPlants list based on userID
// fetch from here http://localhost:3000/myplantslist/:id
export const deleteMyPlantsListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await MyPlantsList.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(200).send();
    } catch (err) {
        next(err);
    }
};
