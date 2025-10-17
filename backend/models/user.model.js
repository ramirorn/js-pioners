import { Schema, model } from "mongoose";

const UserSchema = new Schema(
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
    role: {
      type: String,
      enum: ["Emprendedor", "Inversor", "Admin"],
      default: "Inversor",
      required: true,
    },
    nombre: {
      type: String,
      required: function () {
        return this.role === "Inversor";
      },
      trim: true,
    },
    apellido: {
      type: String,
      required: function () {
        return this.role === "Inversor";
      },
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      trim: true,
    },
    empresa: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
