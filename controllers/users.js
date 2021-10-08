import validator from 'validator';
import createError from 'http-errors';

// model
import User from '../models/users.js';

// get all users
// fetch from here http://localhost:3000/users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
            .populate('myFavoritesList', '_id favorites -userID')
            .populate('myPlantsList', '_id plants');
        //.populate('myGardensList', '_id gardens');
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

// get one user by ID
// fetch from here http://localhost:3000/users/sdjalkdjadkja
export const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
};

// sign up
// addUser controller is validated with post rules in the /signup route
// fetch to here http://localhost:3000/users/signup
export const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
};

// login
// fetch to here http://localhost:3000/users/login
export const loginUser = async (req, res, next) => {
    try {
        // get email and password
        const { email, password } = req.body;

        // normalize email to correctly find the normalized email coming from validation rules PUT
        const normalizedEmail = validator.normalizeEmail(email);

        // use normalizedEmail to find the user
        const userToCheck = await User.findOne({ email: normalizedEmail });

        // if the email is not found throw error
        if (!userToCheck) throw new createError.Unauthorized();

        // if email found check if the password matches using hook authenticate() from userSchema
        const match = await userToCheck.authenticate(password);

        // if no match throw error
        if (!match) throw new createError.Unauthorized();

        // if all conditions are met generate a token with hook generateToken()
        const token = await userToCheck.generateToken();

        res.header('x-auth-token', token).status(200).send(userToCheck);
    } catch (error) {
        next(error);
    }
};

// Update
// updateUser controller uses modified findByIdAndUpdate method in userSchema
// fetch from here http://localhost:3000/users/askldajdlkajljka
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate() checks if the field modified is password and applied validations
        // if not password, uses the normal put
        const updated = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

// delete
// fetch from here http://localhost:3000/users/sadlkadkljalkdaa
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
