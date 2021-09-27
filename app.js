import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { handleErrors, throw404 } from './middleware/errors.js';
// import plantsRouter from './routes/plants.js';

// Express init

const app = express();

dotenv.config();

const PORT = process.env.PORT;

const url = process.env.MONGODB;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
// app.use('/plants', plantsRouter);
app.use(throw404);
app.use(handleErrors);

app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
