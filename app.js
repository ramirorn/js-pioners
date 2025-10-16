// Importaciones
import express from "express";
import "dotenv/config";
import { connectDB } from "./backend/config/database.js";
import { routes } from "./backend/routes/index.js";
import cookieParser from "cookie-parser";

// Variables
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser())

// Rutas
app.use("/api", routes)

// Conexion a la base de datos
app.listen(PORT, async () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    await connectDB();
});