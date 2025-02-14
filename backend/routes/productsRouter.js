import { Router } from "express";
import { getAllProducts, getProductById, updateProduct, createProduct, deleteProduct } from "../controllers/productControllers.js";

const productRouter = Router();

// Ruta para obtener todos los productos
productRouter.get("/", getAllProducts);

// Ruta para obtener un producto mediante su ID
productRouter.get("/:id", getProductById);

// Ruta para crear un nuevo producto
productRouter.post("/", createProduct);

// Ruta para actualizar un producto mediante su ID
productRouter.patch("/:id", updateProduct);
// También puedes usar PUT si prefieres reemplazar el recurso completo
// productRouter.put("/:id", updateProduct);

// Ruta para eliminar un producto mediante su ID
productRouter.delete("/:id", deleteProduct);

export { productRouter };