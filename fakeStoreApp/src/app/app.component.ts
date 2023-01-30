import {
  Component,
  DoCheck,
  IterableDiffers,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getObsCart().subscribe((res) => {
      this.cartSize = res.length;
    });
  }
}
