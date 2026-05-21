import express from "express";
import { createDiscountCoupon } from "./create-discount-coupon.route";
import { updateCoupon } from "./update-discount-coupon.route";
import { deleteCoupon } from "./delete-discount-coupon.route";
import { getDiscountCoupon } from "./get-discount-coupon.route";

const discountCouponRouter = express.Router();

discountCouponRouter.post(
  "/discount-coupons",
  createDiscountCoupon.middlewares,
);

discountCouponRouter.patch("/discount-coupons/:id", updateCoupon.middlewares);

discountCouponRouter.delete("discount-coupons/:id", deleteCoupon.middlewares);

discountCouponRouter.delete("discount-coupons/:id", deleteCoupon.middlewares);

discountCouponRouter.get(
  "discount-coupons/:code",
  getDiscountCoupon.middlewares,
);

export { discountCouponRouter };
