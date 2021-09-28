import mongoose from "mongoose";
const { Schema, model } = mongoose;

const plantSchema = new Schema({});

const Plant = model("Plant", plantSchema);

export default Plant;
