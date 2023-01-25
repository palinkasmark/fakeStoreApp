import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[] = [];

  constructor() {}

  addToCart(product: any) {
    this.cart.push(product);
  }

  getCart(): any[] {
    return this.cart;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let product of this.cart) {
      totalPrice += product.price;
    }
    return totalPrice;
  }
}
