import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js"
import { InvestorModel } from "../models/investor.model.js";
import { EntrepreneurModel } from "../models/entrepreneur.model.js";


export const register = async (req, res) => {
    try {
        const { role } = req.body;

        if (role === "Entrepreneur") {
            const { username, email, password, dni, projects, image, address, web_aplication } = req.body;

            const hashedPassword = await hashPassword(password);
            const newEntrepreneur = new EntrepreneurModel({
                username,
                email,
                password: hashedPassword,
                role,
                dni,
                projects,
                image,
                address,
                web_aplication
            });
            await newEntrepreneur.save();
            return res.status(201).json({
                ok: true,
                msg: "Emprendedor registrado con exito",
                data: newEntrepreneur
            });
        }

        if (role === "Investor") {
            const { username, email, password, nombre, apellido, dni, empresa } = req.body;
            const hashedPassword = await hashPassword(password);
            const newInvestor = new InvestorModel({
                username,
                email,
                password: hashedPassword,
                role,
                nombre,
                apellido,
                dni,
                empresa
            });
            await newInvestor.save();
            return res.status(201).json({
                ok: true,
                msg: "Inversionista registrado con exito",
                data: newInvestor
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}


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
