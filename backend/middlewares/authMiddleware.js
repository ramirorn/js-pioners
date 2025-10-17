import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "No autenticado" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token no proporcionado" });
    }
    const decoded = verifyToken(token);
    // Asegura la estructura esperada por los controladores
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ msg: "Token inválido o sin usuario" });
    }
    req.user = { payload: { userId: decoded.userId } };
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Error interno del servidor" });
  }
};
