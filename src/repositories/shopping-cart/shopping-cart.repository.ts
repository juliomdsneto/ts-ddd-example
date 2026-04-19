import { Repository } from "../../common/repository/repository.common";
import {
  ShoppingCart,
  ShoppingCartWithProducts,
} from "../../entities/shopping-cart.entity";
import { ShoppingCartDoc } from "../../database/docs/shopping-cart.doc";
import { ShoppingCartModel } from "../../database/models/shopping-cart.model";
import { ShoppingCartMapper } from "./shopping-cart.mapper";
import { ProductRepository } from "../product/product.repository";

export class ShoppingCartRepository extends Repository<
  ShoppingCart,
  ShoppingCartDoc
> {
  private productRepository: ProductRepository;

  constructor() {
    super(new ShoppingCartMapper(), new ShoppingCartModel());
    this.productRepository = new ProductRepository();
    this.setReference("products", this.productRepository);
  }

  async populateProducts(shoppingCart: ShoppingCart) {
    const productIds = shoppingCart.products.map((product) => product.id.value);
    const products = await this.productRepository.findByIds(productIds);
    shoppingCart.setProducts(products);
    return shoppingCart as ShoppingCartWithProducts;
  }
}
