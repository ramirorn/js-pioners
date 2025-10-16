import { body } from "express-validator";

export const loginValidation = [
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];
export const registerValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol')
        .optional()
        .isIn(['user', 'admin']).withMessage('El rol debe ser "user" o "admin"'),
]