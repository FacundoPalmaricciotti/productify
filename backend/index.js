//Inicializar el servidor

import express from "express";
import { productRouter } from "./routes/productsRouter.js";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";

process.loadEnvFile();
const app= express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT;

app.use("/api/products",productRouter);
app.listen(PORT,() => {
    console.log("El servidor escucha el puerto: http://localhost:3001/api/products")
    connectDB();
});
