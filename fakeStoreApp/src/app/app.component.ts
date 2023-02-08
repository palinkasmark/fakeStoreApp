import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  DoCheck,
  IterableDiffers,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fakeStoreApp';
  cartSize: number = 0;

  displayedColumns: string[] = ['image', 'title', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  totalPrice: number = 0;

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getObsCart().subscribe((res) => {
      this.cartSize = res.length;
      this.totalPrice = this.cartService.getTotalPrice();
      this.getCartItems();
    });
  }

  getCartItems() {
    this.dataSource = new MatTableDataSource(this.cartService.getCartItems());
  }

  removeItem(product: any) {
    this.cartService.removeItem(product);
    this.totalPrice = this.cartService.getTotalPrice();
  }
  closeMenu() {
    this.menu.closeMenu();
  }
}
