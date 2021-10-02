import bcrypt from 'bcrypt';
import createError from 'http-errors';
import User from '../models/users.js';
import { signJWT } from '../middleware/auth.js';


// sign up
export const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new createError.Unauthorized();
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new createError.Unauthorized();
        ////
        const token = await signJWT({ id: user._id }, process.env.JWT_SECRET);
        res.header('x-auth-token', token).status(200).send(user);

        ////
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (res, req, next) => {};

export const updateUser = async (res, req, next) => {};

export const getSingleUser = async (res, req, next) => {};
