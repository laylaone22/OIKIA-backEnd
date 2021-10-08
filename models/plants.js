import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const plantSchema = new Schema(
    {
        plantName: {
            type: String,
            required: true,
            trim: true
        },
        scientificName: {
            type: String,
            trim: true
        },
        briefDescription: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        goodCompanions: {
            type: [String]
        },
        badCompanions: {
            type: [String]
        },
        wateringInterval: {
            type: Number,
            required: true
        },
        lightConditions: {
            type: String
        },
        season: {
            type: String
        },
        frostTolerance: {
            type: Boolean
        },
        lifeSpan: {
            type: String
        },
        firstHarvestExpected: {
            type: Number
        },
        lastHarvestExpected: {
            type: Number
        },
        icon: {
            type: String
        },
        wiki: {
            type: String
        },
        img: {
            type: String,
            trim: true,
            default: ''
        }
    },
    { timestamps: true }
);

const Plant = model('Plant', plantSchema);

export default Plant;
