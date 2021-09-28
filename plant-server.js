import express from("express");
import cors from("cors");
import dotenv from 'dotenv';

// console.log(process.env.JWT_SECRET);

import {authRouter} from("../auth/auth-router.js");
import {usersRouter} from ("../users/users-router.js");
import {plantsRouter} from("../plants/plants-router.js");
// const waterRouter = require("../water/water-router.js");
// no longer being used
import {db} from ("../database/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/plants", plantsRouter);
// server.use("/api/water", waterRouter);
// no longer being used

server.get("/", (req, res) => {
  res.send("Water My Plant");
});

module.exports = server;