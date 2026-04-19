import express from "express";
import { createProduct } from "./create-product.route";
import { deleteProduct } from "./delete-product.route";
import { getProduct } from "./get-product.route";
import { listProducts } from "./list-products.route";
import { updateProduct } from "./update-product.route";

const productRouter = express.Router();

productRouter.post("/products", createProduct.middlewares);

productRouter.delete("/products/:id", deleteProduct.middlewares);

productRouter.get("/products/:id", getProduct.middlewares);

productRouter.get("/products", listProducts.middlewares);

productRouter.patch("/products/:id", updateProduct.middlewares);

export { productRouter };
