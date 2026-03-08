import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MOCK_CATEGORIES, MOCK_SUPPLIERS } from '../../data/mock-data';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, NgOptimizedImage],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  searchQuery = '';
  categories = MOCK_CATEGORIES;
  suppliers = MOCK_SUPPLIERS;

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }
}
