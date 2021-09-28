
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/users", userRouter);


const url = "mongodb+srv://Frank:frank123@cluster0.7qatk.mongodb.net/foodapp?retryWrites=true&w=majority";

const options = {useNewUrlParser:true};

mongoose.connect(url,options)
                .then(res=> console.log("dataBase connected"))
                .catch(error=> console.log(error))



app.listen(5000,()=> console.log("server runing"))
