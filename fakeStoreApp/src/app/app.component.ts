import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './service/api.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fakeStoreApp';
  cartSize: number = 0;

  displayedColumns: string[] = [
    'image',
    'title',
    'quantity',
    'price',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  totalPrice: number = 0;
  categories: string[] = [];
  search: any;

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;
  @ViewChild(MatDrawerContainer) drawer!: MatDrawerContainer;

  constructor(
    private cartService: CartService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getObsCart().subscribe((res) => {
      this.dataSource = new MatTableDataSource(this.cartService.getCartItems());
      this.cartSize = res.length;
      this.totalPrice = this.cartService.getTotalPrice();
    });
    this.api.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  searchProduct(event: any) {
    this.api.callChangeProduct = true;
    this.api.getAllProducts().subscribe((res) => {
      this.api.changeProduct(
        res.filter((product: any) => product.title.includes(event))
      );
    });
  }

  removeItem(product: any) {
    this.cartService.removeItem(product);
  }

  closeMenu() {
    this.menu.closeMenu();
  }

  increase(product: any) {
    this.cartService.increase(product);
  }

  decrease(product: any) {
    this.cartService.decrease(product);
  }

  getCategory(category: string) {
    this.api.callChangeProduct = true;
    this.drawer.close();
    this.api.getProductByCategory(category).subscribe((res) => {
      this.api.changeProduct(res);
    });
  }

  goHome() {
    this.api.callChangeProduct = true;
    this.api.getAllProducts().subscribe((res) => {
      this.api.changeProduct(res);
      this.router.navigate(['/']);
    });
  }
}
