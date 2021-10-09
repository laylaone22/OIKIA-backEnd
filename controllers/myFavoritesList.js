import createError from 'http-errors';

// model
import MyFavoritesList from '../models/myFavoritesList.js';

//// controllers

// GET all myFavorites lists
// fetch from here http://localhost:3000/myfavoriteslist
// or
// GET only myFavorites lists for a user
// fetch from here http://localhost:3000/:userID/myfavoriteslist
// this works because we merged params between user and myFav routers!!!
export const getMyFavoritesLists = async (req, res, next) => {
    try {
        const { userID } = req.params;
        console.log(userID);
        const query = userID ? { userID } : {};
        const lists = await MyFavoritesList.find(query)
            .populate('userID', 'name email')
            .populate('favorites', '-__v -createdAt -updatedAt');
        res.status(200).send(lists);
    } catch (err) {
        next(err);
    }
};

// POST one myFavorites list
// fetch to here http://localhost:3000/myfavoriteslist
export const addMyFavoritesList = async (req, res, next) => {
    try {
        const newList = new MyFavoritesList(req.body);
        await newList.save();
        res.status(201).send(newList);
    } catch (err) {
        next(err);
    }
};

// GET one myFavorites list based on userID
// fetch from here http://localhost:3000/myfavoriteslist/:id
export const getMyFavoritesListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await MyFavoritesList.findById(id)
            .populate('userID', 'name email')
            .populate('favorites', '-__v -createdAt -updatedAt');
        if (!list) throw new createError.NotFound();
        res.status(200).send(list);
    } catch (err) {
        next(err);
    }
};

// PUT one myFavorites list based on userID
// fetch from here http://localhost:3000/myfavoriteslist/:id
export const updateMyFavoritesListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await MyFavoritesList.findByIdAndUpdate(id, req.body);
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE one myFavorites list based on userID
// fetch from here http://localhost:3000/myfavoriteslist/:id
export const deleteMyFavoritesListByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await MyFavoritesList.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(200).send();
    } catch (err) {
        next(err);
    }
};
