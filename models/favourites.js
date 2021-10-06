import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favouritesSchema = new Schema({
    plants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plant'
        }
    ]
});

const Favourite = model('Favourite', favouritesSchema);
export default Favourite;
