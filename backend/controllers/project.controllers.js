import { matchedData } from "express-validator";
import { ProjectModel } from "../models/project.model.js";

export const createProject = async (req, res) => {
    try {
        // Datos que pasaron las validaciones
        const validatedData = matchedData(req);

        // Creacion del proyecto
        const project = await ProjectModel.create(validatedData);

        // Respuesta
        res.status(201).json({
            ok: true,
            msg: "Proyecto creado con exito",
            data: project
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        // Datos que pasaron las validaciones
        const validatedData = matchedData(req);

        // Actualizacion del proyecto
        const updated = await ProjectModel.findByIdAndUpdate(_id, { $set: validatedData }, { new: true })

        // Respuesta
        res.status(200).json({
            ok: true,
            msg: "Proyecto actualizado con exito",
            data: updated,
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminacion del proyecto
        await ProjectModel.findByIdAndDelete(id);

        // Respuesta
        res.status(200).json({
            ok: true,
            msg:"Proyecto borrado exitosamente"
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
}