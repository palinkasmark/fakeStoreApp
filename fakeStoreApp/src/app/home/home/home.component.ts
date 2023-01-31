import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.apiService.getAllProducts().subscribe((res) => {
      res.forEach((element: any) => {
        element.price = Math.round(element.price);
      });
      this.products = res;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(product);
  }
}
