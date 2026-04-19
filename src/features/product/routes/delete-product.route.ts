import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { ProductService } from "../services/product.service";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const schema = z.object({
  params: paramsSchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const productService = new ProductService();
  const product = await productService.delete(req.params.id);
  res.body = {};
};

export const deleteProduct = new Route(
  "delete-product",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
