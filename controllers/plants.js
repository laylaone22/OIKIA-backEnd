import createError from 'http-errors';
import Plant from '../models/plants.js';

// getPlants is getting all plants based on the plantName query
// fetch from here http://localhost:3000/plants?plantName=

// if plantName= get all plants
// if plantName=au get all plants including au
// if plantName=tomato get all tomato plants

export const getPlants = async (req, res, next) => {
    try {
        const { plantName } = req.query;
        const plant = await Plant.find({}).where('plantName', new RegExp(plantName || ''));
        if (!plant) throw new createError.NotFound();
        res.status(200).send(plant);
    } catch (err) {
        next(err);
    }
};

// addPlant is just for us to add plants to the database
// fetch from here http://localhost:3000/plants

export const addPlant = async (req, res, next) => {
    try {
        const newPlant = new Plant(req.body);
        await newPlant.save();
        res.status(201).send(newPlant);
    } catch (err) {
        next(err);
    }
};

// // dynamic controllers

// get by id
// fetch from http://localhost:3000/plants/plantcyclopedia/id/asldjasdlkajalkdjlj

export const getPlantByID = async (req, res, next) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const plant = await Plant.findById(id);
        if (!plant) throw new createError.NotFound();
        res.status(200).send(plant);
    } catch (err) {
        next(err);
    }
};

// get by Type
// fetch from http://localhost:3000/plants/plantcyclopedia/type/vegetable

export const getPlantsByType = async (req, res, next) => {
    try {
        const { type } = req.params;
        const plants = await Plant.find({ type });
        if (!plants) throw new createError.NotFound();
        res.status(200).send(plants);
    } catch (err) {
        next(err);
    }
};

/*

// if needed we can also get plants by name (params)
// fetch from http://localhost:3000/plants/plantcyclopedia/name/aubergine

export const getPlantByName = async (req, res, next) => {
    try {
        const { plantName } = req.params;
        const plant = await Plant.findOne({ plantName });
        if (!plant) throw new createError.NotFound();
        res.status(200).send(plant);
    } catch (err) {
        next(err);
    }
};

*/
