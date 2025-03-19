import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';

import { Product } from '@features/products/product.interface';
import { map, Observable, tap } from 'rxjs';
import { APIService } from './../../api/api.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly allProducts = signal<Product[]>([]);
  private readonly filteredProducts = signal<Product[]>([]);

  readonly products = computed(() => this.filteredProducts());

  private readonly _apiService = inject(APIService);
  private readonly _endPoint = `${environment.API_URL_FAKE_STORE}/products`;

  constructor() {
    this.getAllProducts()
      .pipe(
        tap((products: Product[]) => {
          this.allProducts.set(products);
          this.filteredProducts.set(products);
        })
      )
      .subscribe();
  }

  getProductById(productId: number): Product | undefined {
    return this.allProducts().find((product) => product.id === productId);
  }

  filterProductsByCategory(category: string): void {
    if (category === 'all') {
      this.filteredProducts.set(this.allProducts());
    } else {
      const filtered = this.allProducts().filter(
        (product) => product.category === category
      );
      this.filteredProducts.set(filtered);
    }
  }

  getProductsByCategory(category: string) {
    return this._apiService
      .get<Product[]>(`${this._endPoint}/category/${category}`)
      .pipe(map((products: Product[]) => this._addProperties(products)));
  }

  private getAllProducts(): Observable<Product[]> {
    return this._apiService
      .get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(map((products: Product[]) => this._addProperties(products)));
  }

  private _addProperties(products: Product[]): Product[] {
    return products.map((product) => ({
      ...product,
      quantity: 0,
    }));
  }
}
