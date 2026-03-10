import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { SupplierProductResponse, CATEGORIES, CategoryItem } from '../../models/api.models';
import { Product } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  
  products: Product[] = [];
  allProducts: SupplierProductResponse[] = [];
  searchQuery = '';
  sortBy = 'popularity';
  categoryFilter = new Set<string>();
  categories: CategoryItem[] = CATEGORIES;
  loading = false;
  error = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      const cat = params['category'];
      if (cat) this.categoryFilter = new Set([cat]);
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllSupplierProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Ошибка загрузки товаров';
        this.loading = false;
      }
    });
  }

  private applyFilters(): void {
    let list = this.allProducts.map(p => this.mapToProduct(p));
    
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q)
      );
    }
    
    if (this.categoryFilter.size) {
      list = list.filter((p) => p.category && this.categoryFilter.has(p.category));
    }
    
    this.products = list;
  }

  private mapToProduct(sp: SupplierProductResponse): Product {
    return {
      id: String(sp.id),
      name: sp.name,
      supplier: sp.supplierName,
      price: sp.price,
      unit: 'шт',
      inStock: sp.count > 0,
      category: '', // API doesn't provide category for supplier products
    };
  }

  toggleCategory(id: string): void {
    if (this.categoryFilter.has(id)) this.categoryFilter.delete(id);
    else this.categoryFilter.add(id);
    this.applyFilters();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }

  get sortLabel(): string {
    return this.sortBy === 'popularity' ? 'По популярности' : 'По цене';
  }
}
