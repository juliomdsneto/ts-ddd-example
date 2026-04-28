import express from "express";
import { createDiscountCoupon } from "./create-discount-coupon.route";

const discountCouponRouter = express.Router();

discountCouponRouter.post(
  "/discount-coupons",
  createDiscountCoupon.middlewares,
);

export { discountCouponRouter };
