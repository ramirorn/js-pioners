import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            password: user.password,
            rol: user.rol,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );

    return token;
};

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
};