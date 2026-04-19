import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { ProductService } from "../services/product.service";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";

const querySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

const schema = z.object({
  query: querySchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res, next) => {
  const productService = new ProductService();
  const products = await productService.list(req.query);
  res.body = products;
};

export const listProducts = new Route(
  "list-products",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
