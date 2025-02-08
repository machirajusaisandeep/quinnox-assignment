import { Component, Input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgbRatingModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private productService: ProductService) {}

  get isInWishlist(): boolean {
    return this.productService
      .getWishlist()
      .some((item) => item.id === this.product.id);
  }

  onWishlistClick(): void {
    if (this.isInWishlist) {
      this.productService.removeFromWishlist(this.product.id);
    } else {
      this.productService.addToWishlist(this.product);
    }
  }

  getRating(): number {
    const rating = Number(this.product.rating) || 0;
    return Math.min(Math.max(rating, 0), 5); // Ensure rating is between 0 and 5
  }

  getStarRating(): string {
    const rating = this.getRating();
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(Math.max(5 - rating, 0));
    return fullStars + emptyStars;
  }
}
