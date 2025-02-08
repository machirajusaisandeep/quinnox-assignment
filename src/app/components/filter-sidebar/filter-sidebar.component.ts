import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FilterState {
  search: string;
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
    search: '',
    priceRange: { min: '', max: '' },
    rating: null,
    categories: [],
  };

  updateFilters(): void {
    this.filterChange.emit(this.filters);
  }

  onSearchChange(): void {
    this.updateFilters();
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
      search: '',
      priceRange: { min: '', max: '' },
      rating: null,
      categories: [],
    };
    this.updateFilters();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filters.search ||
      this.filters.priceRange.min ||
      this.filters.priceRange.max ||
      this.filters.rating ||
      this.filters.categories.length
    );
  }
}
