import { Model } from "../base/model.base";
import { ShoppingCartDoc } from "../docs/shopping-cart.doc";

export class ShoppingCartModel extends Model<ShoppingCartDoc> {
  constructor() {
    super("shopping_carts");
  }
}
