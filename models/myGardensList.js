import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// when creating MyGardensList pass the userID of the user creating it
const myGardensListSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'User'
        },
        gardens: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                trim: true,
                ref: 'Garden'
            }
        ]
    },
    { timestamps: true }
);

const MyGardensList = model('MyGardensList', myGardensListSchema);

export default MyGardensList;
