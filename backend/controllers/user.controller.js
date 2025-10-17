import { UserModel } from "../models/user.model.js";

export const getUserEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    return res.status(200).json({
      ok: true,
      msg: "Usuario obtenido con éxito",
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({
      ok: false,
      msg: error.message || "Error interno del servidor",
      error,
    });
  }
};
