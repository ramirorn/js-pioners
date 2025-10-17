import { Router } from "express";
import { getUserEmail } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/user/email", getUserEmail);
