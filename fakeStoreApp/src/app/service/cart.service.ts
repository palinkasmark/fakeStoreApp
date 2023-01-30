import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];
  obsCart = new BehaviorSubject<any>([]);

  constructor() {}

  addToCart(product: any) {
    this.cartItems.push(product);
    this.obsCart.next(this.cartItems);
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

    this.obsCart.next(this.cartItems);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  getObsCart(): Observable<any> {
    return this.obsCart;
  }
}
