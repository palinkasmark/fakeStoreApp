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
    product.quantity = 1;
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
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  getObsCart(): Observable<any> {
    return this.obsCart;
  }

  increase(product: any) {
    product.quantity += 1;
    this.obsCart.next(this.cartItems);
  }

  decrease(product: any) {
    product.quantity -= 1;
    if (product.quantity < 1) {
      product.quantity = 1;
    }
    this.obsCart.next(this.cartItems);
  }
}
