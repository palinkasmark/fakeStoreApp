import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'title',
    'quantity',
    'price',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getObsCart().subscribe((res) => {
      this.dataSource = new MatTableDataSource(this.cartService.getCartItems());
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeItem(product: any) {
    this.cartService.removeItem(product);
  }

  increase(product: any) {
    this.cartService.increase(product);
  }
  decrease(product: any) {
    this.cartService.decrease(product);
  }
}
