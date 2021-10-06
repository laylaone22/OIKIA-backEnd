import createError from 'http-errors';

import Favorite from '../models/favorites.js';
//import Plant from '../models/plants.js';

export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await Favorite.find({}).populate('plants', '-createdAt -updatedAt -__v');
        res.status(200).send(favorites);
    } catch (err) {
        next(err);
    }
};

export const addFavorite = async (req, res, next) => {
    try {
        const favorite = new Favorite(req.body);

        // const plantExists = await Plant.findById(favorite.plants);
        // if (!favoriteExists) throw new createError.BadRequest('Record ID does not exist');
        await favorite.save();
        res.status(201).send(favorite);
    } catch (err) {
        next(err);
    }
};

export const updateFavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await Favorite.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

/*
export const getSingleFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Favorite = await Favorite.findById(id);

        if (!Favorite) throw new createError.NotFound();
        res.status(200).send(Favorite);
    } catch (err) {
        next(err);
    }
};



export const deleteFavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Favorite.findByIdAndRemove(id);

        if (!deleted) throw new createError.NotFound();
        res.status(204).send;
    } catch (err) {
        next(err);
    }
};


*/
