import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, Product, OrderRequest, OrderResponse } from '../models';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSignal = signal<CartItem[]>([]);

  readonly cart  = this.cartSignal.asReadonly();
  readonly count = computed(() =>
    this.cartSignal().reduce((sum, i) => sum + i.quantity, 0),
  );
  readonly total = computed(() =>
    this.cartSignal().reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  readonly vat         = computed(() => Math.round(this.total() * 0.12));
  readonly totalWithVat = computed(() => this.total() + this.vat());

  constructor(private orderService: OrderService) {}

  // ── mutations ─────────────────────────────────────────────────────────────

  addToCart(product: Product, quantity = 1): void {
    const current  = this.cartSignal();
    const existing = current.find((p) => p.id === product.id);
    if (existing) {
      this.cartSignal.set(
        current.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p,
        ),
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
        p.id === productId ? { ...p, quantity } : p,
      ),
    );
  }

  removeFromCart(productId: string): void {
    this.cartSignal.set(this.cartSignal().filter((p) => p.id !== productId));
  }

  clearCart(): void {
    this.cartSignal.set([]);
  }

  // ── checkout ──────────────────────────────────────────────────────────────

  /**
   * Convert the current cart into an OrderRequest and call POST /api/v1/orders/create.
   * Each CartItem must carry a numeric supplierId — stored in the product model as
   * the `supplier` field when loaded from the backend.
   *
   * Falls back gracefully when supplierId / productId cannot be parsed.
   */
  checkout(): Observable<OrderResponse> {
    const orderItems = this.cartSignal().map((item) => ({
      supplierId: Number(item.supplierId ?? 0),
      productId:  Number(item.id),
      count:      item.quantity,
    }));

    const payload: OrderRequest = { orderItems };
    return this.orderService.create(payload);
  }
}
