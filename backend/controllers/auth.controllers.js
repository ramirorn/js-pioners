import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { role } = req.body;

    if (role === "Emprendedor") {
      const { username, email, password, dni } = req.body;

      const hashedPassword = await hashPassword(password);
      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
        dni,
      });
      await user.save();
      return res.status(201).json({
        ok: true,
        msg: "Emprendedor registrado con exito",
        data: user,
      });
    }

    if (role === "Inversor") {
      const { username, email, password, nombre, apellido, dni, empresa } =
        req.body;
      const hashedPassword = await hashPassword(password);
      const newInvestor = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
        nombre,
        apellido,
        dni,
        empresa,
      });
      await newInvestor.save();
      return res.status(201).json({
        ok: true,
        msg: "Inversionista registrado con exito",
        data: newInvestor,
      });
    }
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({
      ok: false,
      msg: error.message || "Error interno del servidor",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    const passwordValid = await comparePassword(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({ ok: false, msg: "Contraseña Invalida" });
    }

    const token = generateToken({
      userId: user._id,
      role: user.role,
      username: user.username,
    });
    return res.status(200).json({
      data: user,
      ok: true,
      msg: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
