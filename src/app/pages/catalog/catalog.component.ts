import { Component, OnInit, inject, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { SupplierResponse, CATEGORIES, CategoryItem } from '../../models/api.models';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, NgOptimizedImage],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit, AfterViewInit {
  private supplierService = inject(SupplierService);
  
  searchQuery = '';
  categories: CategoryItem[] = CATEGORIES;
  suppliers: SupplierResponse[] = [];
  loading = false;
  error = '';
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Don't load on server to avoid hydration issues
  }

  ngAfterViewInit(): void {
    // Load suppliers only in browser after view is initialized
    if (this.isBrowser) {
      setTimeout(() => this.loadSuppliers(), 0);
    }
  }

  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('[v0] Suppliers load error:', err);
        this.error = err?.error?.message || err?.message || 'Ошибка загрузки поставщиков';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }
}
