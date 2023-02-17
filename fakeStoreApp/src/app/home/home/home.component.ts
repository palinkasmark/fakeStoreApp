import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  subscription!: Subscription;

  constructor(
    protected apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.initProduct();

    this.apiService.products.subscribe((res) => {
      setTimeout(() => {
        if (this.apiService.products.value.length !== 0) {
          this.subscription.unsubscribe();
          this.products = res;
          this.apiService.callChangeProduct = false;
        }
      }, 400);
    });
  }

  initProduct() {
    this.subscription = this.apiService.getAllProducts().subscribe((res) => {
      res.forEach((element: any) => {
        element.price = Math.round(element.price);
      });
      this.products = res;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
