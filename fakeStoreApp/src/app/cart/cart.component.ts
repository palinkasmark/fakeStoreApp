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
  displayedColumns: string[] = ['image', 'title', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.dataSource = new MatTableDataSource(this.cartService.getCartItems());
  }

  removeItem(product: any) {
    this.cartService.removeItem(product);
    this.getCartItems();
  }
}
