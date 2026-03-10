import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { SupplierResponse, SupplierProductResponse } from '../../models/api.models';
import { Product } from '../../models';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-supplier-catalog',
  standalone: true,
  imports: [ProductCardComponent, NgOptimizedImage],
  templateUrl: './supplier-catalog.component.html',
  styleUrl: './supplier-catalog.component.css',
})
export class SupplierCatalogComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);

  supplier: SupplierResponse | null = null;
  products: Product[] = [];
  supplierId = 0;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierId = Number(params['id']) || 1;
      this.loadSupplierData();
    });
  }

  loadSupplierData(): void {
    this.loading = true;
    
    // Load supplier info
    this.supplierService.getSupplierById(this.supplierId).subscribe({
      next: (data) => {
        this.supplier = data;
      },
      error: (err) => {
        this.error = err?.message || 'Ошибка загрузки поставщика';
      }
    });

    // Load supplier products
    this.productService.getAllSupplierProducts().subscribe({
      next: (data) => {
        // Filter products by supplier
        const supplierProducts = data.filter(p => p.supplierId === this.supplierId);
        this.products = supplierProducts.map(p => this.mapToProduct(p));
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
