import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl =
    'https://stg-testdouble.quinnox.info/e55e3668-147b-4652-8870-9acd0205ea83-product-list';
  private wishlistKey = 'productWishlist';
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addToWishlist(product: Product): void {
    const wishlist = this.getWishlist();
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    }
  }

  getWishlist(): Product[] {
    const wishlist = localStorage.getItem(this.wishlistKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  removeFromWishlist(productId: number): void {
    const wishlist = this.getWishlist().filter((item) => item.id !== productId);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }
}
