import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { ProductService } from './services/product.service';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FilterSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  onFilterChange(filters: any) {
    this.productService.getProducts().subscribe((products) => {
      this.filteredProducts = products.filter((product) => {
        const priceMatch =
          (!filters.priceRange.min ||
            product.price >= filters.priceRange.min) &&
          (!filters.priceRange.max || product.price <= filters.priceRange.max);
        const ratingMatch = !filters.rating || product.rating >= filters.rating;
        return priceMatch && ratingMatch;
      });
    });
  }
}
