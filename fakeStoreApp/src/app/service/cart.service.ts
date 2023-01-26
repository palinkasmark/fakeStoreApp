import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  constructor() {}

  addToCart(product: any) {
    this.cartItems.push(product);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(product: any) {
    this.cartItems.forEach((element, index) => {
      if (element === product) {
        this.cartItems.splice(index, 1);
      }
    });
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  }
}
