import { Route, Endpoint } from "../../../common/route/route.common";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";

const route: Endpoint<{}> = async (_, res) => {
  const shoppingCartService = new ShoppingCartService();
  const shoppingCart = await shoppingCartService.create();
  res.body = {
    id: shoppingCart.id.value,
    products: shoppingCart.products,
    totalPrice: shoppingCart.totalPrice,
  };
};

export const createShoppingCartRoute = new Route(
  "create-shopping-cart",
  RouteMiddleware(route),
);
