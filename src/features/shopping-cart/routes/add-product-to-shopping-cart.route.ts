import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  productId: z.coerce.number().int().positive(),
});

const schema = z.object({
  params: paramsSchema,
  body: bodySchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const shoppingCartId = req.params.id;
  const shoppingCartService = new ShoppingCartService();
  const shoppingCart = await shoppingCartService.addProduct(
    shoppingCartId,
    req.body.productId,
  );

  res.body = {
    id: shoppingCart.id.value,
    products: shoppingCart.products,
    totalPrice: shoppingCart.totalPrice,
  };
};

export const addProductToShoppingCartRoute = new Route(
  "add-product-to-shopping-cart",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
