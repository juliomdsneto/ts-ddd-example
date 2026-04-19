import { server } from "./src/server/server";
import { db } from "./src/database/database";
import { ShoppingCartService } from "./src/features/shopping-cart/services/shopping-cart.service";
import { ProductRepository } from "./src/repositories/product/product.repository";
import { Product } from "./src/entities/product.entity";

server.listen(3000, () => {
  console.log("Server started");
});

const run = async () => {
  const product = new Product({ id: 1, name: "paper", price: 1.0 });
  const product2 = new Product({ id: 2, name: "paper2", price: 4.0 });
  const productRepository = new ProductRepository();
  await productRepository.save(product);
  await productRepository.save(product2);

  const shoppingCartService = new ShoppingCartService();
  let shoppingCart = await shoppingCartService.create();
  shoppingCart = await shoppingCartService.addProduct(
    shoppingCart.id.value,
    product.id.value,
  );

  shoppingCart = await shoppingCartService.addProduct(
    shoppingCart.id.value,
    product2.id.value,
  );

  console.log({ p: shoppingCart.products });
  console.log(JSON.stringify(shoppingCart.id));
};

run();
