// Importaciones
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./backend/config/database.js";

// Variables
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser())

// Rutas


// Conexion a la base de datos
app.listen(PORT, async () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    await connectDB();
});