import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";
import { DiscountCouponService } from "../discount-coupon.service";

const paramsSchema = z.object({
  code: z.coerce.string(),
});

const schema = z.object({
  params: paramsSchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const discountCouponService = new DiscountCouponService();
  const coupon = await discountCouponService.listCoupons(req.params.code);
  res.body = coupon;
};

export const getDiscountCoupon = new Route(
  "get-discount-coupons",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
