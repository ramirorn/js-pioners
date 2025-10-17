import { Router } from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  getMyProjects,
  getAllProjects,
  setInterest,
  setNoInterest,
  getProjectInterested,
  getInterestedProjects,
  getProjectPendientes,
  aprobateProject,
  rejectateProject,
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
projectRoutes.get("/projects", authMiddleware, getAllProjects);
// projectRoutes.get("/projects/interesados", authMiddleware, getProjectInterested);
projectRoutes.get(
  "/projects/interesados",
  authMiddleware,
  getInterestedProjects
);
projectRoutes.get("/projects/pendientes", authMiddleware, getProjectPendientes);
projectRoutes.put("/projects/aprobar/:id", authMiddleware, aprobateProject);
projectRoutes.put("/projects/rechazar/:id", authMiddleware, rejectateProject);
projectRoutes.put("/projects/interesado/:id", authMiddleware, setInterest);
projectRoutes.put("/projects/no_interesado/:id", authMiddleware, setNoInterest);
projectRoutes.delete("/projects/:id", deleteProject);
