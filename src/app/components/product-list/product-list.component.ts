import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  applyFilters(filters: any) {
    this.filteredProducts = this.products.filter((product) => {
      const priceMatch =
        (!filters.priceRange.min || product.price >= filters.priceRange.min) &&
        (!filters.priceRange.max || product.price <= filters.priceRange.max);
      const ratingMatch = !filters.rating || product.rating >= filters.rating;
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      return priceMatch && ratingMatch && categoryMatch;
    });
  }
}
