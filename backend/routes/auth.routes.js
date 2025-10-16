import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";


export const authRoutes = Router();

authRoute.post("/auth/register", register);
authRoute.post("/auth/login", login);
authRoutes.post("/auth/logout", logout);