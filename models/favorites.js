import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favoriteSchema = new Schema(
    {
        plants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Plant'
            }
        ]
    },
    {
        timestamps: true,
        id: false,
        toJSON: {
            virtuals: true
        }
    }
);

const Favorite = model('Favorite', favoriteSchema);

export default Favorite;
