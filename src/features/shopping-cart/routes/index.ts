import express from "express";
import { getShoppingCartRoute } from "./get-shopping-cart.route";
import { createShoppingCartRoute } from "./create-shopping-cart.route";
import { addProductToShoppingCartRoute } from "./add-product-to-shopping-cart.route";

const shoppingCartRouter = express.Router();

shoppingCartRouter.get("/shopping-carts/:id", getShoppingCartRoute.middlewares);

shoppingCartRouter.post("/shopping-carts", createShoppingCartRoute.middlewares);

shoppingCartRouter.post(
  "/shopping-carts/:id",
  addProductToShoppingCartRoute.middlewares,
);

export { shoppingCartRouter };
