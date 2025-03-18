import { Injectable } from '@angular/core';
import { CartStore } from './cart-state.service';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private readonly STORAGE_KEY = '';

  loadState(): CartStore | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  saveState(state: CartStore): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }
}
