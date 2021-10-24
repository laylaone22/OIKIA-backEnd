import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// middlewares
import { handleErrors, throw404 } from './middleware/errors.js';
import setCors from './middleware/cors.js';

// routes
import userRouter from './routes/users.js';
import plantsRouter from './routes/plants.js';
import myPlantsRouter from './routes/myPlants.js';
import myGardensRouter from './routes/myGardens.js';

// Express init
const app = express();
const PORT = process.env.PORT || 3000;

// Dotenv init
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

// routes
app.use('/users', userRouter);
app.use('/plants', plantsRouter);
app.use('/myplants', myPlantsRouter);
app.use('/mygardens', myGardensRouter);

// static assets folders
// http://localhost:3000/public/images/tomato.jpg
app.use('/public/image', express.static('public/image'));
// http://localhost:3000/public/icons-png/13_tomato.png
app.use('/public/icons-png', express.static('public/icons-png'));
// http://localhost:3000/public/icons-svg/13_tomato.svg
app.use('/public/icons-svg', express.static('public/icons-svg'));

// 404 to trigger middleware if no other routes match
app.use(throw404);

// error handling middleware
app.use(handleErrors);

// Start listening
app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
