import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public cart: CartService) {}

  updateQty(id: string, delta: number): void {
    const item = this.cart.cart().find((i) => i.id === id);
    if (item) this.cart.updateQuantity(id, item.quantity + delta);
  }

  remove(id: string): void {
    this.cart.removeFromCart(id);
  }
}
