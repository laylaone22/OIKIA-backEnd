import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// when creating MyFavoritesList pass the userID of the user creating it
const myFavoritesListSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'User'
        },
        favorites: [
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

const MyFavoritesList = model('MyFavoritesList', myFavoritesListSchema);

export default MyFavoritesList;
