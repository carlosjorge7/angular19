import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@features/categories/categories.service';
import { CategoryButtonComponent } from '../category-button/category-button.component';
import { ProductsService } from '@features/products/products.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [AsyncPipe, CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    {{ selectCategory() }}
    <ul class="list-container">
      <li>
        <app-category-button
          category="all"
          [(filterCategory)]="selectCategory"
        />
      </li>
      <!-- TODO: Can be an  component -->
      @for (category of categories(); track $index) {
      <li>
        <app-category-button
          [category]="category"
          [(filterCategory)]="selectCategory"
        />
      </li>
      }
    </ul>
  `,
})
export class CategoryFilterComponent {
  readonly categories = inject(CategoryService).categories;
  private readonly productSvr = inject(ProductsService);

  selectCategory = signal<string>('all');

  constructor() {
    effect(
      () => this.productSvr.filterProductsByCategory(this.selectCategory()),
      {
        allowSignalWrites: true,
      }
    );
  }
}
