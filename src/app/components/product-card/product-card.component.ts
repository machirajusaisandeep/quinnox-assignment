import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgbRating],
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
}
