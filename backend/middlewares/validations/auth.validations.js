import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage('El rol debe ser "user" o "admin"'),
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres"),
  body("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser una cadena de caracteres"),
  body("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isString()
    .withMessage("El DNI debe ser una cadena de caracteres"),
  body("empresa")
    .optional()
    .isString()
    .withMessage("La empresa debe ser una cadena de caracteres"),
];
