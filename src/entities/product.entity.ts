import { Entity } from "../common/entity/entity.common";

export interface IProduct {
  id?: number;
  name: string;
  price: number;
}

export class Product extends Entity {
  public name: string;
  public price: number;

  constructor(productData: IProduct) {
    super(productData.id);
    this.name = productData.name;
    this.price = productData.price;
  }
}
