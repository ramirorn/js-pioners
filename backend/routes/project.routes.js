import { Router } from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  getMyProjects,
} from "../controllers/project.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { applyValidations } from "../middlewares/validator.js";
// import { createProjectValidations, updateProjectValidations, deleteProjectValidations } from "../middlewares/validations/project.validations.js";

export const projectRoutes = Router();

// projectRoutes.post("/projects", createProjectValidations, applyValidations, createProject);
// projectRoutes.put("/projects/:id", updateProjectValidations, applyValidations, updateProject);
// projectRoutes.delete("/projects/:id", deleteProjectValidations, applyValidations, deleteProject);

projectRoutes.post("/projects", authMiddleware, createProject);
projectRoutes.get("/projects/my", authMiddleware, getMyProjects);
projectRoutes.put("/projects/:id", updateProject);
projectRoutes.delete("/projects/:id", deleteProject);
