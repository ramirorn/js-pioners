import { Schema, model } from "mongoose";

const EntrepreneurSchema = new Schema({
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
        enum: ["Entrepreneur", "Admin"],
        default: "Entrepreneur",
        required: true,
    },
    dni: {
        type: String,
        required: true,
        trim: true
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
    image: {
        type: String,
        default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1696549196/js-pioners/default-user_qxk7yq.png",
    },
    address: {
        type: String,
        trim: true
    },
    web_aplication: {
        type: String,
        trim: true
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const EntrepreneurModel = model("Entrepreneur", EntrepreneurSchema);