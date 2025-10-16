import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { projectRoutes } from "./project.routes.js";

export const routes = Router();

routes.use(authRoutes);
routes.use(projectRoutes)