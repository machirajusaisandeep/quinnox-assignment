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
  template: `
    <div class="sidebar p-3">
      <h4>Filters</h4>

      <div class="mb-3">
        <label class="form-label">Price Range</label>
        <div class="d-flex gap-2">
          <input
            type="number"
            class="form-control"
            [(ngModel)]="filters.priceRange.min"
            (input)="debouncedUpdateFilters()"
            placeholder="Min"
          />
          <input
            type="number"
            class="form-control"
            [(ngModel)]="filters.priceRange.max"
            (input)="debouncedUpdateFilters()"
            placeholder="Max"
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Rating</label>
        @for (star of [5,4,3,2,1]; track star) {
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            [id]="'rating' + star"
            name="rating"
            [value]="star"
            [(ngModel)]="filters.rating"
            (change)="updateFilters()"
          />
          <label class="form-check-label" [for]="'rating' + star">
            {{ star }} Stars & Up
          </label>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .sidebar {
        background-color: #f8f9fa;
        height: 100%;
      }
    `,
  ],
})
export class FilterSidebarComponent {
  @Output() filterChange = new EventEmitter<FilterState>();

  filters: FilterState = {
    categories: [],
    priceRange: { min: 0, max: 0 },
    rating: null,
  };

  public debouncedUpdateFilters = debounce(() => this.updateFilters(), 300);

  updateFilters(): void {
    this.filterChange.emit(this.filters);
  }
}
