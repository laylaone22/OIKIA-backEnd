import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import * as path from 'path';

import { handleErrors, throw404 } from './middleware/errors.js';
import setCors from './middleware/cors.js';
import plantsRouter from './routes/plants.js';
import userRouter from './routes/users.js';

// Express init
const app = express();
const PORT = process.env.PORT || 3000;

// Dotenv init
dotenv.config();

// Mongoose init
const URL = process.env.MONGODB;
//const __dirname = path.resolve();

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
app.use('/users', userRouter);

// static assets folders
app.use('/public/images', express.static('public/images'));
app.use('/public/icons-png', express.static('public/icons-png'));
app.use('/public/icons-svg', express.static('public/icons-svg'));

// 404 to trigger middleware if no other routes match
app.use(throw404);

// error handling middleware
app.use(handleErrors);

// Start listening
app.listen(PORT, () => console.log(`Express running on port ${PORT}`));

/*
app.use("/public", express.static(__dirname + "/public"));
app.use("/public2", express.static(__dirname + "/public2")); 

*/
