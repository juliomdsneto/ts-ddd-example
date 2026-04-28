import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";
import { DiscountCouponService } from "../discount-coupon.service";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  value: z.coerce.number().min(1),
});

const schema = z.object({
  body: bodySchema,
  params: paramsSchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const discountCouponService = new DiscountCouponService();
  const coupon = await discountCouponService.updateCoupon(
    req.params.id,
    req.body,
  );
  res.body = {
    value: coupon.value,
  };
};

export const updateCoupon = new Route(
  "update-discount-coupon",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
