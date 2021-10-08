import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// when creating MyPlantsList pass the userID of the user creating it
const myPlantsListSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'User'
        },
        plants: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                trim: true,
                ref: 'Plant'
            }
        ]
    },
    { timestamps: true }
);

const MyPlantsList = model('MyPlantsList', myPlantsListSchema);

export default MyPlantsList;
