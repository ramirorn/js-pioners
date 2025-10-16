import { Schema, model } from "mongoose";

const UserScehma = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9_]+$/,
                "El username solo puede contener letras, números y guiones bajos",
            ],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Por favor ingresa un email válido",
            ],
        },
        password: {
            type: String,
            required: [true, "La contraseña es requerida"],
            minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
        },
        rol: {
            type: String,
            enum: ["Entrepreneur", "Investor", "Admin"],
            default: "Investor",
            required: true,
        },
        nombre: {
            type: String,
            required: function () { return this.rol === "Entrepreneur" || this.rol === "Investor" },
            trim: true,
        },
        apellido: {
            type: String,
            required: function () { return this.rol === "Entrepreneur" || this.rol === "Investor" },
            trim: true
        },
        dni: {
            type: String,
            required: function () { return this.rol === "Entrepreneur" || this.rol === "Investor" },
            trim: true
        },
        empresa: {
            type: String,
            required: function () { return this.rol === "Investor" }
        },
        projects: [{
            type: Schema.Types.ObjectId,
            ref: "Projects",
            required:  function () { return this.rol === "Entrepreneur" }
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const UserModel = model("User", UserScehma);
