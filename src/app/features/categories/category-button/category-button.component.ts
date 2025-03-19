import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [],
  template: ` <button
    type="button"
    (click)="handleClick()"
    class="btn btn-hover"
  >
    {{ category() }}
  </button>`,
  styles: [
    `
      .btn {
        @apply bg-primary-default text-base font-medium px-6 capitalize py-2 rounded-md flex items-center gap-2 text-white ease-linear duration-300;

        &-hover {
          @apply hover:bg-primary-dark;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryButtonComponent {
  category = input.required<string>();
  filterCategory = model.required<string>();

  handleClick(): void {
    this.filterCategory.set(this.category());
  }
}
