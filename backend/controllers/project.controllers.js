// import { matchedData } from "express-validator";
import { ProjectModel } from "../models/project.model.js";

export const createProject = async (req, res) => {
  const { userId } = req.user.payload;

  const imagen_path = req.file ? req.file.path : '';
  try {
    // Datos que pasaron las validaciones
    // const validatedData = matchedData(req);
    // Creacion del proyecto
    const project = await ProjectModel.create({
      ...req.body,
      owner: userId,
      imagen_path: imagen_path,
    });
    console.log(project);
    // Respuesta
    res.status(201).json({
      ok: true,
      msg: "Proyecto creado con exito",
      data: project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getMyProjects = async (req, res) => {
  const { userId } = req.user.payload;
  try {
    const projects = await ProjectModel.find({ owner: userId });
    res.status(200).json({
      ok: true,
      msg: "Proyectos obtenidos con éxito",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getProjectInterested = async (req, res) => {
  const { userId } = req.user.payload;
  try {
    const projects = await ProjectModel.find({ interesado: userId });
    res.status(200).json({
      ok: true,
      msg: "Proyectos en los que estás interesado",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getProjectPendientes = async (req, res) => {
  try {
    const projects = await ProjectModel.find({ estado: "Pendiente" });
    res.status(200).json({
      ok: true,
      msg: "Proyectos pendientes obtenidos con éxito",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { userId } = req.user.payload;
    // Solo proyectos aprobados y que el usuario NO haya visto (ni interesado ni no_interesado)
    const projects = await ProjectModel.find({
      estado: "Aprobado",
      interesado: { $ne: userId },
      no_interesado: { $ne: userId },
    });
    res.status(200).json({
      ok: true,
      msg: "Proyectos obtenidos con éxito",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

//Tengo que revisar
export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    // id viene por params, validatedData con los campos permitidos en body/params
    // const validatedData = matchedData(req);

    // Actualizacion del proyecto usando el id correcto
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

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
};

export const approveProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: { estado: "Aprobado", revisado: true } },
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
};
// PUT: rechazar proyecto -> estado: "rechazado", revisado: true
export const rejectProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: { estado: "Rechazado", revisado: true } },
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
};

//Tengo que revisar
export const setInterest = async (req, res) => {
  try {
    const { id } = req.params; // id del proyecto
    const { userId } = req.user.payload; // id del usuario inversor

    // Añadir el userId al array interesado si no está
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $addToSet: { interesado: userId } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ ok: false, msg: "Proyecto no encontrado" });
    }

    return res.status(200).json({
      ok: true,
      msg: "Interés registrado",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

//Tengo que revisar
export const setNoInterest = async (req, res) => {
  try {
    const { id } = req.params; // id del proyecto
    const { userId } = req.user.payload; // id del usuario inversor

    // Añadir el userId al array no_interesado si no está
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $addToSet: { no_interesado: userId } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ ok: false, msg: "Proyecto no encontrado" });
    }

    return res.status(200).json({
      ok: true,
      msg: "No interés registrado",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const aprobateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: { estado: "Aprobado", revisado: true } },
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const rejectateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: { estado: "Rechazado", revisado: true } },
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
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

//Tengo que revisar
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminacion del proyecto
    await ProjectModel.findByIdAndDelete(id);

    // Respuesta
    res.status(200).json({
      ok: true,
      msg: "Proyecto borrado exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getInterestedProjects = async (req, res) => {
  try {
    const { userId } = req.user.payload;
    // Buscar proyectos donde el usuario está en el array interesado
    const projects = await ProjectModel.find({ interesado: userId });
    res.status(200).json({
      ok: true,
      msg: "Proyectos que le interesan al inversor",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
