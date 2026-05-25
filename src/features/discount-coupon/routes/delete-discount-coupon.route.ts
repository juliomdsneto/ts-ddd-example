import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";
import { DiscountCouponService } from "../discount-coupon.service";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const schema = z.object({
  params: paramsSchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const discountCouponService = new DiscountCouponService();
  const couponId = req.params.id;
  const coupon = await discountCouponService.deleteCoupon(couponId);
  res.body = {
    success: true,
    message: `Coupon ${couponId} deleted`,
  };
};

export const deleteCoupon = new Route(
  "delete-discount-coupons",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
