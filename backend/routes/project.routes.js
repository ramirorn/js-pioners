import { Router } from "express";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
// import { applyValidations } from "../middlewares/validator.js";
// import { createProjectValidations, updateProjectValidations, deleteProjectValidations } from "../middlewares/validations/project.validations.js";

export const projectRoutes = Router();

// projectRoutes.post("/projects", createProjectValidations, applyValidations, createProject);
// projectRoutes.put("/projects/:id", updateProjectValidations, applyValidations, updateProject);
// projectRoutes.delete("/projects/:id", deleteProjectValidations, applyValidations, deleteProject);

projectRoutes.post("/projects", createProject);
projectRoutes.put("/projects/:id", updateProject);
projectRoutes.delete("/projects/:id", deleteProject);
