import { Mapper } from "../../common/repository/mapper.common";
import { ProductDoc } from "../../database/docs/product.doc";
import { Product } from "../../entities/product.entity";

export class ProductMapper extends Mapper<Product, ProductDoc> {
  constructor() {
    super();
  }

  entityToPersistence(entity: Product): ProductDoc {
    if (!entity.id.value) {
      throw new Error("Invalid Entity");
    }

    return new ProductDoc({
      id: entity.id.value,
      name: entity.name,
      price: entity.price,
    });
  }

  persistenceToEntity(persistence: ProductDoc): Product {
    return new Product({
      id: persistence.id,
      name: persistence.name,
      price: persistence.price,
    });
  }
}
