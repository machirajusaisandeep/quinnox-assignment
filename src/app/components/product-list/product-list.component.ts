import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FilterState } from '../filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  applyFilters(filters: FilterState): void {
    this.filteredProducts = this.allProducts.filter((product) => {
      const productPrice = parseFloat(product.price);
      const productRating = parseFloat(product.rating);
      const minPrice = filters.priceRange.min
        ? parseFloat(filters.priceRange.min)
        : 0;
      const maxPrice = filters.priceRange.max
        ? parseFloat(filters.priceRange.max)
        : Infinity;
      const filterRating = filters.rating ? parseFloat(filters.rating) : 0;

      const priceInRange = productPrice >= minPrice && productPrice <= maxPrice;
      const meetsRating = productRating >= filterRating;

      return priceInRange && meetsRating;
    });
  }
}
