import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const plantSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true,
      trim: true,
    },
    scientificName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    goodCompanions: {
      type: [string],
    },
    badCompanions: {
      type: [string],
    },
    wateringInterval: {
      type: Number,
      required: true,
    },
    lightConditions: {
      type: String,
    },
    season: {
      type: String,
    },
    frostTolerance: {
      type: Boolean,
    },
    lifeSpan: {
      type: String,
    },
    firstHarvestExpected: {
      type: Number,
    },
    lastHarvestExpected: {
      type: Number,
    },
    wiki: {
      type: String,
    },
    img: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Plant = model('Plant', plantSchema);

export default Plant;
