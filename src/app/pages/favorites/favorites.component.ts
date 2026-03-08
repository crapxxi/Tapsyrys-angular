import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MOCK_PRODUCTS } from '../../data/mock-data';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  products = MOCK_PRODUCTS.slice(0, 9);
  sortBy = 'date';

  constructor(
    public auth: AuthService,
    public cart: CartService
  ) {}

}
