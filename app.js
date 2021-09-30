import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { handleErrors, throw404 } from './middleware/errors.js';
import setCors from './middleware/cors.js';
import plantsRouter from './routes/plants.js';

// Express init
const app = express();
const PORT = process.env.PORT || 3000;

// dotenv init
dotenv.config();

// Mongoose init
const URL = process.env.MONGODB;

// Mongoose connection
mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(setCors);
app.use('/plants', plantsRouter);
app.use(throw404);
app.use(handleErrors);

app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
