import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// when creating myPlant pass the userID, gardenID, plantID of the user creating it
const myPlantSchema = new Schema(
    {
        // Parent referencing, one-to-many
        // which user or garden does the myPlant belong to?

        userID: {
            type: Schema.Types.ObjectId,
            required: true
            // No ref field required for parent referencing
        },
        gardenID: {
            type: Schema.Types.ObjectId,
            required: true
            // No ref field required for parent referencing
        },
        plantID: {
            type: Schema.Types.ObjectId,
            required: true
            // No ref field required for parent referencing
        },
        name: {
            type: String,
            //required: true,
            trim: true
        }
        // to be added:
        // planted on
        // watering dates
        // personal water interval
        // bought at the supermarket
    },
    { timestamps: true }
);

const MyPlant = model('MyPlant', myPlantSchema);

export default MyPlant;
