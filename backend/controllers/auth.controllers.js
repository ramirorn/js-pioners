import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken, verifyToken } from "../helpers/jwt.helper.js"
import { UserModel } from "../models/user.model.js";


export const register = async (req, res) => {
    try {
        const { username, email, password, rol } = req.body;

        const existingUser = await UserModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario o email ya están registrados"
            })
        };

        const hash = await hashPassword(password);

        const userCreate = await UserModel.create({
            username,
            email,
            password: hash,
            rol
        });
        return res.status(201)
            .json({ msg: "Usuario registrado correctamente", data: userCreate });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "error interno del servidor"
        })
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select('+password');
        const passwordValid = await comparePassword(password, user.password);

        if (!passwordValid) { return res.status(400).json({ ok: false, msg: "Contraseña Invalida" }) }

        const token = generateToken({
            userId: user._id,
            rol: user.rol,
            username: user.username
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}
