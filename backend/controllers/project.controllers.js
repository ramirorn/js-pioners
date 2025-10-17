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
        // id viene por params, validatedData con los campos permitidos en body/params
        const { id } = req.params;
        const validatedData = matchedData(req);

        // Actualizacion del proyecto usando el id correcto
        const updated = await ProjectModel.findByIdAndUpdate(id, { $set: validatedData }, { new: true });

        // Respuesta
        res.status(200).json({
            ok: true,
            msg: "Proyecto actualizado con exito",
            data: updated,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
}

export const approveProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProjectModel.findByIdAndUpdate(
            id,
            { $set: { estado: "aprobado", revisado: true } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ ok: false, msg: "Proyecto no encontrado" });
        }

        res.status(200).json({
            ok: true,
            msg: "Proyecto aprobado",
            data: updated,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
}
// PUT: rechazar proyecto -> estado: "rechazado", revisado: true
export const rejectProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProjectModel.findByIdAndUpdate(
            id,
            { $set: { estado: "rechazado", revisado: true } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ ok: false, msg: "Proyecto no encontrado" });
        }

        res.status(200).json({
            ok: true,
            msg: "Proyecto rechazado",
            data: updated,
        });
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
            msg: "Proyecto borrado exitosamente"
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
}
