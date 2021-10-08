import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const myPlantSchema = new Schema(
    {
        plants: {
            type: Schema.Types.ObjectId,
            trim: true,
            ref: 'Plant'
        },
        alias: String,
        wateringIntervall: Number,
        garden: {
            type: Schema.Types.ObjectId,
            ref: 'MyGarden'
        }
    },
    { timestamps: true }
);

const MyPlant = model('MyPlant', myPlantSchema);

export default MyPlant;
