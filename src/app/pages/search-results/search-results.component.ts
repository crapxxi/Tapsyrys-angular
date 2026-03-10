import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../data/mock-data';
import { Product } from '../../models';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  private route = inject(ActivatedRoute);
  products: Product[] = [];
  searchQuery = '';
  sortBy = 'popularity';
  categoryFilter = new Set<string>();
  categories = MOCK_CATEGORIES;

  constructor(private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      const cat = params['category'];
      if (cat) this.categoryFilter = new Set([cat]);
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    let list = [...MOCK_PRODUCTS];
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
