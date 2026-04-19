import { Model } from "../base/model.base";
import { ProductDoc } from "../docs/product.doc";

export class ProductModel extends Model<ProductDoc> {
  constructor() {
    super("products");
  }
}
