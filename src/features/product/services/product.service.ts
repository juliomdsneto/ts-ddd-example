import { SystemError } from "../../../common/errors/system.error";
import { IProduct, Product } from "../../../entities/product.entity";
import { ProductRepository } from "../../../repositories/product/product.repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(productData: Pick<IProduct, "name" | "price">) {
    const product = new Product(productData);
    return await this.productRepository.save(product);
  }

  async delete(productId: number) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw SystemError.NotFound("Product not found");
    }

    return await this.productRepository.delete(product);
  }

  async get(productId: number) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw SystemError.NotFound("Product not found");
    }

    return product;
  }

  async update(
    productId: number,
    productData: Pick<IProduct, "name" | "price">,
  ) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw SystemError.NotFound("Product not found");
    }

    product.name = productData.name;
    product.price = productData.price;

    return await this.productRepository.save(product);
  }

  async list(options: { limit?: number; offset?: number }) {
    return await this.productRepository.find({}, options);
  }
}
