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
        },
        plantedAt: {
            type: Date,
            required: true
        },
        userWatering: {
            type: Number,
            required: true
        },
        notes: {
            type: String,
            trim: true
        },
        position: {
            type: Number,
            required: true
        },
        isAlive: { type: Boolean, default: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

myPlantSchema.virtual('plant', {
    ref: 'Plant', // parent ref collection Plant
    foreignField: '_id',
    localField: 'plantID'
});

const MyPlant = model('MyPlant', myPlantSchema);

export default MyPlant;
