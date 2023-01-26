import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'products/' + id);
  }

  // deleteProduct(id: number): Observable<any> {
  //   return this.http.delete<any>(this.baseUrl + 'products/' + id);
  // }
}
