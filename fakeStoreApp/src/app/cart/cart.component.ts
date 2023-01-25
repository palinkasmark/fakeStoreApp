import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  dataSource!: any;
  displayedColumns: string[] = ['image', 'title', 'price', 'action'];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.dataSource = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
    console.log(this.dataSource);
  }
}
