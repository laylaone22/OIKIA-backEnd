import bcrypt from 'bcrypt';
import createError from 'http-errors';

// model
import User from '../models/users.js';

// helpers
import { signJWT, verifyJWT } from '../helpers/auth.js';

// get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

// sign up
// addUser controller is validated with post rules in the /signup route
export const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        //console.log(newUser);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        // get email and password
        const { email, password } = req.body;

        // use email to find the user
        const user = await User.findOne({ email });
        console.log(user);
        // if the email is not found throw error
        if (!user) throw new createError.Unauthorized();

        // if email found check if the password matches using hook authenticatePassword() from userSchema
        const match = await user.authorizePassword(password);
        console.log(match);

        // or ... julia's approach without hooks:
        //const match = await bcrypt.compare(password, user.password);

        // if no match throw error
        if (!match) throw new createError.Unauthorized();

        // if all conditions are met generate a token with hook generateToken()
        const token = await user.generateToken();

        // or ... julia's approach without hooks:
        //const token = await signJWT({ id: user._id, type: 'auth' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.header('x-auth-token', token).status(200).send(user);

        ////
        //res.status(200).send(user);
    } catch (error) {
        next(error);
    }
};

export const getSingleUser = async (req, res, next) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {};

export const updateUser = async (req, res, next) => {};
