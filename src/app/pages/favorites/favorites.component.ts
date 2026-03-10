import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { SupplierProductResponse } from '../../models/api.models';
import { Product } from '../../models';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  loading = false;
  error = '';
  sortBy = 'date';

  constructor(
    public auth: AuthService,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // For now, load all products as favorites (implement favorites API when available)
    this.productService.getAllSupplierProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 9).map(p => this.mapToProduct(p));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Ошибка загрузки товаров';
        this.loading = false;
      }
    });
  }

  private mapToProduct(sp: SupplierProductResponse): Product {
    return {
      id: String(sp.id),
      name: sp.name,
      supplier: sp.supplierName,
      price: sp.price,
      unit: 'шт',
      inStock: sp.count > 0,
    };
  }
}
