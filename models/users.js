import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import createError from 'http-errors';

// import validator from 'validator';
import { encryptPassword, comparePassword } from '../helpers/encryption.js';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        role: {
            type: String,
            enum: {
                values: ['user', 'admin'],
                message: 'Invalid user role {VALUE}'
            },
            default: 'user'
        },
        gardenType: {
            type: String,
            enum: {
                values: ['inDoor', 'outDoor']
            }
        },
        gardenPlants: {
            type: [String]
        }
    }
    // {
    //     timestamps: true
    // }
);

userSchema.pre('save', async function () {
    if (this.role === 'admin') this.role = 'user';
});
// userSchema.set('toJSON', {
//     virtuals: true,
//     transform: (doc, ret) => {
//         ret.id = ret._id;
//         delete ret.password;
//         delete ret.createdAt;
//         delete ret.updatedAt;
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//     }
// });

const User = model('User', userSchema);
export default User;
