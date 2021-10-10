import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import setCors from "./middleware/cors.js";
import userRouter from "./routes/users.js";
import plantRouter from "./routes/plants.js";
import gardenRouter from "./routes/gardens.js";
import { errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();
app.use(setCors);
app.use(express.json());

app.use("/users", userRouter);
app.use("/plants", plantRouter);
app.use("/gardens", gardenRouter);
app.use(errorHandler);
//const url = "mongodb+srv://Frank:frank123@cluster0.7qatk.mongodb.net/plantapp?retryWrites=true&w=majority";

const url = process.env.DB_URL;

const options = { useNewUrlParser: true };

mongoose
  .connect(url, options)
  .then((res) => console.log("dataBase connected"))
  .catch((error) => console.log(error));

app.listen(5005, () => console.log("server runing"));
