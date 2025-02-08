import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce } from '../../utils/debounce';

interface FilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  rating: number | null;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  @Output() filterChange = new EventEmitter<FilterState>();

  categories = ['Electronics', 'Clothing', 'Books', 'Sports', 'Home'];
  selectedCategories: string[] = [];

  filters: FilterState = {
    categories: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
  };

  public debouncedUpdateFilters = debounce(() => this.updateFilters(), 300);

  updateFilters(): void {
    this.filterChange.emit({
      ...this.filters,
      categories: this.selectedCategories,
    });
  }

  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.updateFilters();
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }
}
