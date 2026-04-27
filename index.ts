import { server } from "./src/server/server";
import { db } from "./src/database/database";
import { ShoppingCartService } from "./src/features/shopping-cart/services/shopping-cart.service";
import { ProductRepository } from "./src/repositories/product/product.repository";
import { Product } from "./src/entities/product.entity";
import { DiscountCoupon } from "./src/entities/discount-coupon.entity";
import { DiscountCouponRepository } from "./src/repositories/discount-coupon/discount-coupon.repository"
import { DiscountCouponService } from "./src/features/discount-coupon/discount-coupon.service"

server.listen(3000, () => {
  console.log("Server started");
});

const run = async () => {
  const couponService = new DiscountCouponService();
  const product = new Product({ id: 1, name: "paper", price: 1.0 });
  const product2 = new Product({ id: 2, name: "paper2", price: 4.0 });
  const coupon = new DiscountCoupon({ id: 3, code: "bauruVeg10", value: 10 });
  const coupon1 = await couponService.create("bauru", 10);
  const coupon2 = await couponService.create("test", 15);
  const coupon3 = await couponService.create("baurubauru", 13);

  const newCoupon = await couponService.updateCoupon(1, 25);

  const discountCouponRepository = new DiscountCouponRepository();

  const found = await couponService.listCoupons("baurubauru");

  await discountCouponRepository.save(coupon);

  const productRepository = new ProductRepository();
  await productRepository.save(product);
  await productRepository.save(product2);
  await productRepository.save(product2);

  const findCoupon = discountCouponRepository.findById(coupon.id.value)

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

  // console.log({ p: shoppingCart.products });
  // console.log({ coupon: coupon });
  // console.log({ findCoupon: findCoupon });
  console.log(found)
  console.log(coupon1)
  console.log(findCoupon)
  console.log(newCoupon)
  // console.log(JSON.stringify(shoppingCart.id));
};

run();
