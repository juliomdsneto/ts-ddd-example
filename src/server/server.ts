import express from "express";
import { shoppingCartRouter } from "../features/shopping-cart/routes";
import { productRouter } from "../features/product/routes";
import { ResponseMiddleware } from "../common/middlewares/response.middleware";
import { discountCouponRouter } from "../features/discount-coupon/routes";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(shoppingCartRouter);
server.use(productRouter);
server.use(discountCouponRouter);
server.use(ResponseMiddleware);

export { server };
