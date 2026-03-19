import { Component, OnInit } from '@angular/core';
import { ProductCardComponent }  from '../../components/product-card/product-card.component';
import { FormsModule }           from '@angular/forms';
import { AuthService }           from '../../services/auth.service';
import { ShopService }           from '../../services/shop.service';
import { ProductService }        from '../../services/product.service';
import { Product, SupplierProductResponse } from '../../models';

function toProduct(r: SupplierProductResponse): Product {
  return {
    id:       String(r.productId),
    name:     r.name,
    supplier: r.supplierName,
    price:    r.price,
    unit:     'шт',
    inStock:  r.count > 0,
  };
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];
  sortBy  = 'date';
  loading = false;
  error   = '';

  constructor(
    public auth: AuthService,
    private shopService: ShopService,
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) return;
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.loading = true;
    this.shopService.getFavorites().subscribe({
      next:  (data) => { this.products = data.map(toProduct); this.loading = false; },
      error: (err)  => { this.error = err?.error?.message ?? 'Ошибка загрузки'; this.loading = false; },
    });
  }
}
