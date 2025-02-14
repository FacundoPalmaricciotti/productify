import { Router } from "express";
import { getAllProducts, getProductById, updateProduct, createProduct, deleteProduct } from "../controllers/productControllers.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", createProduct);


productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export { productRouter };