import mongoose from "mongoose";
const { Schema, model } = mongoose;

const plantSchema = new Schema({
  name: String,
});

const Plant = model("Plant", plantSchema);

export default Plant;
