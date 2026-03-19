import { Component, input } from '@angular/core';
import { DecimalPipe }      from '@angular/common';
import { Product }          from '../../models';
import { CartService }      from '../../services/cart.service';
import { ProductService }   from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product  = input.required<Product>();
  isLiked  = input(false);

  liked = false;

  constructor(
    private cart: CartService,
    private productSvc: ProductService,
  ) {}

  addToCart(p: Product): void {
    if (p.inStock) this.cart.addToCart(p);
  }

  toggleFavorite(p: Product): void {
    this.productSvc.toggleFavorite(Number(p.id)).subscribe({
      next: () => { this.liked = !this.liked; },
    });
  }
}
