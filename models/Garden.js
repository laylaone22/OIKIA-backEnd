import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  size: {
    length: String,
    width: String,
  },

  plants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
});
const Garden = model("Garden", gardenSchema);

export default Garden;
