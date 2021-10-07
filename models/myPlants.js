import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const myPlantSchema = new Schema(
    {
        plants: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'Plant'
        }
    },
    { timestamps: true }
);

const MyPlant = model('MyPlant', myPlantSchema);

export default MyPlant;
