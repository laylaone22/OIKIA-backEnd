import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// when creating MyGarden pass the userID of the user creating it
const myGardenSchema = new Schema(
    {
        // Parent referencing, one-to-many
        // which user does the garden belong to?
        userID: {
            type: Schema.Types.ObjectId,
            required: true
            // No ref field required for parent referencing
        },
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
            max: [10, '{VALUE} is unfortunately too much']
        },
        length: {
            type: Number,
            required: true,
            min: [1, 'Please select at least 1'],
            max: [10, '{VALUE} is unfortunately too much']
        }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

myGardenSchema.virtual('myGardenPlants', {
    ref: 'MyPlant', // parent ref collection MyPlant
    foreignField: 'gardenID',
    localField: '_id'
});

const MyGarden = model('MyGarden', myGardenSchema);

export default MyGarden;
