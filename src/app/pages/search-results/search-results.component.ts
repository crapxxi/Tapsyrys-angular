import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule }         from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService }       from '../../services/product.service';
import { MOCK_CATEGORIES }      from '../../data/mock-data';
import { Product, ProductResponse } from '../../models';

/** Map a backend ProductResponse to the frontend Product shape */
function toProduct(r: ProductResponse): Product {
  return {
    id:      String(r.id),
    name:    r.name,
    category: r.category,
    supplier: '',
    price:    0,
    unit:     'шт',
    inStock:  true,
  };
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  private route   = inject(ActivatedRoute);
  private productSvc = inject(ProductService);

  products: Product[] = [];
  searchQuery   = '';
  sortBy        = 'popularity';
  categoryFilter = new Set<string>();
  categories     = MOCK_CATEGORIES;
  loading        = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      const cat = params['category'];
      if (cat) this.categoryFilter = new Set([cat]);
      this.fetchProducts();
    });
  }

  private fetchProducts(): void {
    this.loading = true;
    const category = this.categoryFilter.size
      ? [...this.categoryFilter][0]
      : undefined;

    this.productSvc.search(this.searchQuery || undefined, category).subscribe({
      next: (data) => {
        this.products = data.map(toProduct);
        this.loading  = false;
      },
      error: () => { this.loading = false; },
    });
  }

  toggleCategory(id: string): void {
    if (this.categoryFilter.has(id)) this.categoryFilter.delete(id);
    else this.categoryFilter.add(id);
    this.fetchProducts();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }
}
