import { ProductDoc } from "../../database/docs/product.doc";
import { ProductModel } from "../../database/models/product.model";
import { Product } from "../../entities/product.entity";
import { Repository } from "../../common/repository/repository.common";
import { ProductMapper } from "./product.mapper";

export class ProductRepository extends Repository<Product, ProductDoc> {
  constructor() {
    super(new ProductMapper(), new ProductModel());
  }
}
