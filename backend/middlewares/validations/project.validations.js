import { body, param } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";

export const createProjectValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre del proyecto debe ser incluido")
        .isLength({ max: 100 })
        .withMessage("El nombre del proyecto no debe superar los 100 caracteres")
        .isString()
        .withMessage("El nombre debe ser una cadena de caracteres")
        .custom(async (name) => {
            const nameExists = await ProjectModel.findOne({ name: name })
            if (nameExists) {
                throw new Error("El nombre del proyecto ya existe");
            }
        }),
    body("description")
        .notEmpty()
        .withMessage("La descripcion debe ser incluida")
        .isLength({ min: 50 })
        .withMessage("La descripcion del proyecto debe contener un minimo de 50 caracteres")
        .isString()
        .withMessage("La descripcion debe ser una cadena de caracteres"),
    body("owner")
        .notEmpty()
        .withMessage("El dueño del proyecto debe ser incluido")
        .isMongoId()
        .withMessage("El ID del usuario debe ser uno valido de mongo"),
]

export const updateProjectValidations = [
    param("id")
        .notEmpty()
        .withMessage("El id debe ser incluido")
        .isMongoId()
        .withMessage("El id debe ser uno valido de mongo"),
    body("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre del proyecto debe ser incluido")
        .isLength({ max: 100 })
        .withMessage("El nombre del proyecto no debe superar los 100 caracteres")
        .isString()
        .withMessage("El nombre debe ser una cadena de caracteres")
        .custom(async (name) => {
            const nameExists = await ProjectModel.findOne({ name: name })
            if (nameExists) {
                throw new Error("El nombre del proyecto ya existe");
            }
        }),
    body("description")
        .optional()
        .notEmpty()
        .withMessage("La descripcion debe ser incluida")
        .isLength({ min: 50 })
        .withMessage("La descripcion del proyecto debe contener un minimo de 50 caracteres")
        .isString()
        .withMessage("La descripcion debe ser una cadena de caracteres"),
    body("owner")
        .optional()
        .notEmpty()
        .withMessage("El dueño del proyecto debe ser incluido")
        .isMongoId()
        .withMessage("El ID del usuario debe ser uno valido de mongo"),
]

export const deleteProjectValidations = [
    param("id")
        .notEmpty()
        .withMessage("El id debe ser incluido")
        .isMongoId()
        .withMessage("El id debe ser uno valido de mongo"),
]