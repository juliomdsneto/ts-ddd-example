import { Reference } from "../../common/entity/reference.common";
import { Mapper } from "../../common/repository/mapper.common";
import { ShoppingCartDoc } from "../../database/docs/shopping-cart.doc";
import { Product } from "../../entities/product.entity";
import { ShoppingCart } from "../../entities/shopping-cart.entity";

export class ShoppingCartMapper extends Mapper<ShoppingCart, ShoppingCartDoc> {
  constructor() {
    super();
  }

  entityToPersistence(shoppingCart: ShoppingCart): ShoppingCartDoc {
    return new ShoppingCartDoc({
      id: Number(shoppingCart.id.value),
      products: shoppingCart.products.map((product) =>
        Number(product.id.value),
      ),
    });
  }

  persistenceToEntity(persistence: ShoppingCartDoc): ShoppingCart {
    return new ShoppingCart({
      id: persistence.id,
      products: persistence.products.map(
        (product) => new Reference<Product>(product),
      ),
    });
  }
}
