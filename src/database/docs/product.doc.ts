interface IProductDoc {
  id: number;
  name: string;
  price: number;
}

export class ProductDoc implements IProductDoc {
  public id: number;
  public name: string;
  public price: number;

  constructor(productData: IProductDoc) {
    this.id = productData.id;
    this.name = productData.name;
    this.price = productData.price;
  }
}
