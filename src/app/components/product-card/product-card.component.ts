import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  isLiked = input(false);

  constructor(private cart: CartService) {}

  addToCart(p: Product): void {
    if (p.inStock) this.cart.addToCart(p);
  }

  favoriteAction(): void {
    // Favorites service can be added later; emit or call service
  }
}
