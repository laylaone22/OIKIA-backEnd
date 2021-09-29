import { Router } from "express";
import { addUser, getUsers, userLogin } from "../controllers/users.js";

const userRouter = Router();
userRouter.route("/").get(getUsers).post(addUser);
userRouter.route("/login").post(userLogin);

export default userRouter;
