import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FilterState {
  priceRange: { min: string; max: string };
  rating: string | null;
  categories: string[];
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  @Output() filterChange = new EventEmitter<FilterState>();

  categories = ['Electronics', 'Clothing', 'Books', 'Sports', 'Home'];

  filters: FilterState = {
    priceRange: { min: '', max: '' },
    rating: null,
    categories: [],
  };

  updateFilters(): void {
    this.filterChange.emit(this.filters);
  }

  onPriceChange(): void {
    this.updateFilters();
  }

  onRatingChange(rating: number): void {
    this.filters.rating = rating.toString();
    this.updateFilters();
  }

  toggleCategory(category: string): void {
    const index = this.filters.categories.indexOf(category);
    if (index === -1) {
      this.filters.categories.push(category);
    } else {
      this.filters.categories.splice(index, 1);
    }
    this.updateFilters();
  }

  isCategorySelected(category: string): boolean {
    return this.filters.categories.includes(category);
  }

  clearFilters(): void {
    this.filters = {
      priceRange: { min: '', max: '' },
      rating: null,
      categories: [],
    };
    this.updateFilters();
  }
}
