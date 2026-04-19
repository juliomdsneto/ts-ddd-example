import { z } from "zod";
import { Route, Endpoint } from "../../../common/route/route.common";
import { ValidationMiddleware } from "../../../common/middlewares/validation.middleware";
import { ProductService } from "../services/product.service";
import { RouteMiddleware } from "../../../common/middlewares/route.middleware";

const bodySchema = z.object({
  name: z.string(),
  price: z.coerce.number().min(0),
});

const schema = z.object({
  body: bodySchema,
});

type SchemaType = z.infer<typeof schema>;

const route: Endpoint<SchemaType> = async (req, res) => {
  const productService = new ProductService();
  const product = await productService.create(req.body);
  res.body = {
    id: product.id,
    name: product.name,
    price: product.price,
  };
};

export const createProduct = new Route(
  "create-product",
  ValidationMiddleware(schema),
  RouteMiddleware(route),
);
