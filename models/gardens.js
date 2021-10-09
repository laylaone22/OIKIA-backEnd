// gardenType: {
//     type: String,
//     enum: {
//         values: ['inDoor', 'outDoor']
//     }
// },

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const gardenSchema = new Schema(
    {
        gardenName: {
            type: String,
            required: true,
            trim: true
        },
        gardenType: {
            type: String,
            required: true,
            enum: {
                values: ['indoor', 'outdoor'],
                message: '{VALUE} is not a valid garden type'
            }
        },
        width: {
            type: Number,
            required: true,
            min: [1, 'Please select at least 1'],
            max: [100, '{VALUE} is unfortunately too much']
        },
        length: {
            type: Number,
            required: true,
            min: [1, 'Please select at least 1'],
            max: [100, '{VALUE} is unfortunately too much']
        },
        // Parent referencing, one-to-many
        // which myGardensList does the garden belong to?
        userID: {
            type: Schema.Types.ObjectId,
            required: true
            // No ref field required for parent referencing
        }
    },
    { timestamps: true }
);

const Garden = model('Garden', gardenSchema);

export default Garden;
