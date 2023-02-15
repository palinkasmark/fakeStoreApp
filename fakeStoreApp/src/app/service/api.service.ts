import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://fakestoreapi.com/';

  products = new BehaviorSubject([]);
  callChangeProduct: boolean = false;

  constructor(private http: HttpClient) {}

  changeProduct(products: any) {
    this.products.next(products);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'products/' + id);
  }

  // deleteProduct(id: number): Observable<any> {
  //   return this.http.delete<any>(this.baseUrl + 'products/' + id);
  // }

  getCategories(): Observable<any> {
    return this.http.get<any>('https://fakestoreapi.com/products/categories');
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      'https://fakestoreapi.com/products/category/' + category
    );
  }
}
