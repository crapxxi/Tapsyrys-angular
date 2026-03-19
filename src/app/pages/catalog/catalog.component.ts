import { Component, OnInit } from '@angular/core';
import { Router, RouterLink }  from '@angular/router';
import { FormsModule }         from '@angular/forms';
import { NgOptimizedImage }    from '@angular/common';
import { MOCK_CATEGORIES }     from '../../data/mock-data';
import { SupplierService }     from '../../services/supplier.service';
import { SupplierResponse }    from '../../models';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, NgOptimizedImage],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  searchQuery = '';
  categories  = MOCK_CATEGORIES;
  suppliers: SupplierResponse[] = [];
  loading = false;

  constructor(
    private router: Router,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.supplierService.getAll().subscribe({
      next:     (data) => { this.suppliers = data; this.loading = false; },
      error:    ()     => { this.loading = false; },
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
