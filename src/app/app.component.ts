import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { FilterState } from './components/filter-sidebar/filter-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './services/product.service';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    FilterSidebarComponent,
    NgbModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(ProductListComponent) productList!: ProductListComponent;
  showWishlist = false;

  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  get wishlistCount(): number {
    return this.productService.getWishlist().length;
  }

  get wishlistItems(): Product[] {
    return this.productService.getWishlist();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  onFilterChange(filters: FilterState) {
    if (this.productList) {
      this.productList.applyFilters(filters);
    }
  }

  toggleWishlist(): void {
    this.showWishlist = !this.showWishlist;
  }

  removeFromWishlist(productId: number): void {
    this.productService.removeFromWishlist(productId);
  }
}
