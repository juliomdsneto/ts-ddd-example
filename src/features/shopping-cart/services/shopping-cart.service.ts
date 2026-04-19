import { Reference } from "../../../common/entity/reference.common";
import {
  ShoppingCart,
  ShoppingCartWithProducts,
} from "../../../entities/shopping-cart.entity";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { ShoppingCartRepository } from "../../../repositories/shopping-cart/shopping-cart.repository";

export class ShoppingCartService {
  private shoppingCartRepository: ShoppingCartRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.shoppingCartRepository = new ShoppingCartRepository();
    this.productRepository = new ProductRepository();
  }

  async create() {
    const shoppingCart = ShoppingCart.create();
    return await this.shoppingCartRepository.save(shoppingCart);
  }

  async addProduct(shoppingCartId: number, productId: number) {
    const shoppingCart = await this.get(shoppingCartId);

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Product not found!");
    }

    shoppingCart.addProduct(product);

    await this.shoppingCartRepository.save(shoppingCart);

    return shoppingCart;
  }

  async removeProduct(shoppingCartId: number, productId: number) {
    const shoppingCart =
      await this.shoppingCartRepository.findById(shoppingCartId);

    if (!shoppingCart) {
      throw new Error("Shopping cart not found!");
    }

    const reference = new Reference(productId);

    shoppingCart.removeProduct(reference);

    await this.shoppingCartRepository.save(shoppingCart);

    return shoppingCart;
  }

  // get and set
  async get(shoppingCartId: number) {
    const shoppingCart =
      await this.shoppingCartRepository.findById(shoppingCartId);

    if (!shoppingCart) {
      throw new Error("Shopping cart not found!");
    }

    const productIds = shoppingCart.products.map((product) => product.id.value);
    const products = await this.productRepository.findByIds(productIds);
    shoppingCart.setProducts(products);

    return shoppingCart;
  }

  // get and populate products
  async get2(shoppingCartId: number) {
    const shoppingCart =
      await this.shoppingCartRepository.findById(shoppingCartId);

    if (!shoppingCart) {
      throw new Error("Shopping cart not found!");
    }

    await this.shoppingCartRepository.populate(shoppingCart, "products");

    const shoppingCartWithProducts =
      await this.shoppingCartRepository.populateProducts(shoppingCart);

    return shoppingCartWithProducts;
  }

  //get and populate generic
  async get3(shoppingCartId: number) {
    const shoppingCart =
      await this.shoppingCartRepository.findById(shoppingCartId);

    if (!shoppingCart) {
      throw new Error("Shopping cart not found!");
    }

    const shoppingCartWithProducts =
      await this.shoppingCartRepository.populate<ShoppingCartWithProducts>(
        shoppingCart,
        "products",
      );

    return shoppingCartWithProducts;
  }

  // with
  async get4(shoppingCartId: number) {
    const shoppingCart = await this.shoppingCartRepository
      .with<ShoppingCartWithProducts>("products")
      .findById(shoppingCartId);

    if (!shoppingCart) {
      throw new Error("Shopping cart not found!");
    }

    return shoppingCart;
  }
}
