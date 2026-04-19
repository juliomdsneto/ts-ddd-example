import { Entity } from "../common/entity/entity.common";
import { Product } from "./product.entity";
import { Reference, HasMany } from "../common/entity/reference.common";

export interface IShoppingCart {
  id?: number;
  products: HasMany<Product>;
}

export type ShoppingCartWithProducts = Omit<ShoppingCart, "products"> & {
  products: Product[];
};

export class ShoppingCart extends Entity {
  public products: HasMany<Product>;

  constructor(shoppingCartData: IShoppingCart) {
    super(shoppingCartData.id);
    this.products = shoppingCartData.products;
  }

  get totalPrice() {
    if (!this.hasValue(this.products)) {
      throw new Error("Can't calculate total price without products data");
    }

    return this.products.reduce((acc, product) => acc + product.price, 0);
  }

  static create() {
    return new ShoppingCart({ products: [] });
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(product: Product | Reference<Product>) {
    const index = this.products.findIndex(
      (p) => p.id.value === product.id.value,
    );

    if (index === -1) {
      return;
    }

    this.products.splice(index, 1);
  }
}
