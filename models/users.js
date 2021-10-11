import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import createError from 'http-errors';

// helpers to encrypt (bcrypt)
import { encryptPassword, comparePassword } from '../helpers/encryption.js';

// helpers to auth (JWT - node.js)
import { signJWT, verifyJWT } from '../helpers/auth.js';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true
            //unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        myFavorites: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                trim: true,
                ref: 'Plant' // child ref collection Plant
            }
        ]
    },
    {
        timestamps: true
    }
);

// parent ref for MyGardens
userSchema.virtual('myGardens', {
    ref: 'MyGarden', // parent ref collection MyGarden
    foreignField: 'userID',
    localField: '_id'
});
// parent ref for MyPlants
userSchema.virtual('myPlants', {
    ref: 'MyPlant', // parent ref collection MyPlant
    foreignField: 'userID',
    localField: '_id'
});

//// sign up

// step 1. encrypt password with bcrypt every time you save a user (pre--> save)
userSchema.pre('save', async function () {
    this.password = await encryptPassword(this.password);
});

////  login
// step 2. auth the password on login using helper comparePassword (hook--> authenticate)
userSchema.method('authenticate', async function (clearTextPassword) {
    // Compare the encrypted password with the given one
    return await comparePassword(clearTextPassword, this.password);
});

// step 3. generate token when sign up using helper signJWT (hook--> generateToken)
userSchema.method('generateToken', async function () {
    // encrypt the id of the user to generate the token
    return await signJWT({ id: this._id, type: 'auth' }, process.env.JWT_SECRET, { expiresIn: '7d' });
});

// step 4. verify whether the token comes from us using helper verifyJWT (hook--> verifyToken)
userSchema.static('verifyToken', async function (token) {
    try {
        const decodedToken = await verifyJWT(token, process.env.JWT_SECRET);
        return await this.findById(decodedToken.id);
    } catch (err) {
        throw new createError.Unauthorized();
    }
});

// step 5. workaround to update password for put methods
userSchema.pre('findOneAndUpdate', async function () {
    // In query middleware, this is the query, which means there is no this.password;
    // Here, you should check for whether the password has been updated
    if (!this._update.password) return;
    this._update.password = await encryptPassword(this._update.password);
});

// step 6. remember to delete the password from the database
userSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.password;
        return ret;
    }
});

// at the moment we do not have roles!!

// userSchema.pre('save', async function () {
//     if (this.role === 'admin') this.role = 'user';
// });

const User = model('User', userSchema);

export default User;
