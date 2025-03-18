import { computed, inject, Injectable, signal } from '@angular/core';

import { Product } from '@features/products/product.interface';
import { ToastrService } from 'ngx-toastr';

import { CartCalculatorService } from 'src/app/store/cart-state/cart-calculator.service';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly _cartCalculatorService = inject(CartCalculatorService);
  private readonly _toastrService = inject(ToastrService);

  private readonly products = signal<Product[]>([]);

  readonly totalAmount = computed(() =>
    this._cartCalculatorService.calculateTotal(this.products())
  );

  readonly productCount = computed(() =>
    this._cartCalculatorService.calculateItemsCount(this.products())
  );

  readonly cartStore = computed(() => ({
    products: this.products(),
    totalAmount: this.totalAmount(),
    productsCount: this.productCount(),
  }));

  addToCart(product: Product): void {
    const currentProducts = this.products();

    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex] = {
        ...product,
        quantity: (currentProducts[existingProductIndex].quantity || 0) + 1,
      };
      this.products.set(currentProducts);
    } else {
      this.products.update((products: Product[]) => [
        ...products,
        { ...product, quantity: 1 },
      ]);
    }

    this._toastrService.success('Product added!!', 'CEJO STORE');
  }

  removeFromCart(productId: number): void {
    try {
      const currentProducts = this.products();
      const productExists = currentProducts.some((p) => p.id !== productId);

      if (!productExists) {
        this._toastrService.warning('Product not found');
        return;
      }
      this.products.update((products: Product[]) =>
        products.filter((product: Product) => product.id !== productId)
      );
      this._toastrService.success('Product removed!!', 'DOMINI STORE');
    } catch (error) {
      this._toastrService.warning('Error' + error);
    }
  }

  clearCart(): void {
    this.products.set([]);
    this._toastrService.success('All Products removed!', 'DOMINI STORE');
  }
}
