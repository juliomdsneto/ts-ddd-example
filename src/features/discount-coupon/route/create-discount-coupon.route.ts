import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";
import { DiscountCouponService } from "../discount-coupon.service";

const bodySchema = z.object({
  code: z.string(),
  value: z.coerce.number().min(1),
});

const schema = z.object({
  body: bodySchema,
});

type schemaType = z.infer<typeof schema>;

const route: Endpoint<schemaType> = async (req, res) => {
  const discountCouponService = new DiscountCouponService();
  const coupon = await discountCouponService.create(req.body);
  res.body = {
    id: coupon.id,
    code: coupon.code,
    value: coupon.value,
  };
};

export const createDiscountCoupon = new Route(
  "create-discount-coupon",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
