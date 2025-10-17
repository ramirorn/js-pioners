import { model, Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        description: {
            type: String,
            required: true,
            minLength: 50,
        },
        imagen_path: {
            type: String,
            default: '',
            required: true,
        },
        direccion: {
            type: String,
            trim: true,
            required: true
        },
        aplicacion_web_url: {
            type: String,
            trim: true,
            match: [/^(http|https):\/\/[^ "]+$/, "Ingresa una URL válida."],
            default: '',
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        interesado: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        interesado: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        revisado: {
            type: Boolean,
            default: false,
        },
        estado: {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente',
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const ProjectModel = model("Project", ProjectSchema)