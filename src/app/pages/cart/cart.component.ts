import { Component }          from '@angular/core';
import { RouterLink }          from '@angular/router';
import { DecimalPipe }         from '@angular/common';
import { CartService }         from '../../services/cart.service';
import { AuthService }         from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  checkoutLoading = false;
  checkoutSuccess = false;
  checkoutError   = '';

  constructor(
    public cart: CartService,
    public auth: AuthService,
  ) {}

  updateQty(id: string, delta: number): void {
    const item = this.cart.cart().find((i) => i.id === id);
    if (item) this.cart.updateQuantity(id, item.quantity + delta);
  }

  remove(id: string): void {
    this.cart.removeFromCart(id);
  }

  placeOrder(): void {
    if (!this.auth.isAuthenticated()) {
      this.checkoutError = 'Войдите в аккаунт для оформления заказа.';
      return;
    }
    if (!this.cart.cart().length) return;

    this.checkoutLoading = true;
    this.checkoutError   = '';
    this.checkoutSuccess = false;

    this.cart.checkout().subscribe({
      next: () => {
        this.checkoutSuccess = true;
        this.checkoutLoading = false;
        this.cart.clearCart();
      },
      error: (err) => {
        this.checkoutError   = err?.error?.message ?? 'Ошибка при оформлении заказа.';
        this.checkoutLoading = false;
      },
    });
  }
}
