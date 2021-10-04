import createError from 'http-errors';

// model
import User from '../models/users.js';

// login auth function
export const verifyLogin = async (req, res, next) => {
    try {
        // access the token provided through the userSchema hooks
        const token = req.header('x-auth-token');
        // If there is no token throw an error
        if (!token) throw new createError.Unauthorized();

        // if there is a token verify that is valid using the hook verifyToken from userSchema
        const verifiedUser = await User.verifyToken(token);
        // If there is no token throw an error
        if (!verifiedUser) throw new createError.Unauthorized();

        // If we have a verified user attach the token to the request
        req.user = verifiedUser;
        next();
    } catch (err) {
        next(err);
    }
};

// use these in case user roles are implemented

// roles
/*export const verifyAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') throw new createError.Unauthorized();
        next();
    } catch (err) {
        next(err);
    }
};*/

/*export const verifyIsUserOrAdmin = (req, res, next) => {
    try {
        if (req.params.id !== String(req.user._id) && req.user.role !== 'admin') throw new createError.Unauthorized();
        next();
    } catch (err) {
        next(err);
    }
};*/
