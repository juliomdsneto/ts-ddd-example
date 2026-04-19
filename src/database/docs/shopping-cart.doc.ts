interface IShoppingCart {
  id: number;
  products: number[];
}

export class ShoppingCartDoc implements IShoppingCart {
  public id: number;
  public products: number[];

  constructor(shoppingCart: IShoppingCart) {
    this.id = shoppingCart.id;
    this.products = shoppingCart.products;
  }
}
