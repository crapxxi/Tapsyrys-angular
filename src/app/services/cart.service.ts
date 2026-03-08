import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSignal = signal<CartItem[]>([]);
  readonly cart = this.cartSignal.asReadonly();
  readonly count = computed(() =>
    this.cartSignal().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly total = computed(() =>
    this.cartSignal().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  readonly vat = computed(() => Math.round(this.total() * 0.12));
  readonly totalWithVat = computed(() => this.total() + this.vat());

  addToCart(product: Product, quantity = 1): void {
    const current = this.cartSignal();
    const existing = current.find((p) => p.id === product.id);
    if (existing) {
      this.cartSignal.set(
        current.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    } else {
      this.cartSignal.set([...current, { ...product, quantity }]);
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }
    this.cartSignal.set(
      this.cartSignal().map((p) =>
        p.id === productId ? { ...p, quantity } : p
      )
    );
  }

  removeFromCart(productId: string): void {
    this.cartSignal.set(this.cartSignal().filter((p) => p.id !== productId));
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }
}
