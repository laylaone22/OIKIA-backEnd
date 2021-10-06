import createError from 'http-errors';

import Favourite from '../models/favourites.js';
import Plant from '../models/plants.js';

export const addFavourites = async (req, res, next) => {
    try {
        const favourites = new Favourite(req.body);
        await favourites.save();
        res.status(201).send(favourites);
    } catch (err) {
        next(err);
    }
};

export const getFavourites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Favourite = await Favourite.findById(id);

        if (!Favourite) throw new createError.NotFound();
        res.status(200).send(Favourite);
    } catch (err) {
        next(err);
    }
};

export const deleteFavourites = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Favourite.findByIdAndRemove(id);

        if (!deleted) throw new createError.NotFound();
        res.status(204).send;
    } catch (err) {
        next(err);
    }
};

export const updateFavourites = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = await Favourite.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) throw new createError.NotFound();
      res.status(200).send(updated);
    } catch (err) {
      next(err);
    }
  };