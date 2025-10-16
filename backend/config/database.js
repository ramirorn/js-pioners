import mongoose from "mongoose";

// Conexión con MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // await mongoose.connection.db.dropDatabase();
        console.log("✅ Conexión a la base de datos exitosa");
    } catch (err) {
        console.error("❌ Error al conectar a la base de datos:", err);
    }
};
