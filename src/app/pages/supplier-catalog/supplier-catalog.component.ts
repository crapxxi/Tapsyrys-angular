import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute }          from '@angular/router';
import { NgOptimizedImage }        from '@angular/common';
import { ProductCardComponent }    from '../../components/product-card/product-card.component';
import { SupplierService }         from '../../services/supplier.service';
import { SupplierResponse, SupplierProductResponse, Product } from '../../models';

function toProduct(r: SupplierProductResponse): Product {
  return {
    id:       String(r.productId),
    name:     r.name,
    supplier: r.supplierName,
    price:    r.price,
    unit:     'шт',
    inStock:  r.count > 0,
    supplierId: String(r.supplierId),
  } as Product & { supplierId: string };
}

@Component({
  selector: 'app-supplier-catalog',
  standalone: true,
  imports: [ProductCardComponent, NgOptimizedImage],
  templateUrl: './supplier-catalog.component.html',
  styleUrl: './supplier-catalog.component.css',
})
export class SupplierCatalogComponent implements OnInit {
  private route       = inject(ActivatedRoute);
  private supplierSvc = inject(SupplierService);

  supplier: SupplierResponse | null = null;
  products: Product[] = [];
  loading = false;
  supplierId = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierId = Number(params['id'] ?? 1);
      this.loadData();
    });
  }

  private loadData(): void {
    this.loading = true;

    // Load supplier list to find the specific one
    this.supplierSvc.getAll().subscribe({
      next: (suppliers) => {
        this.supplier = suppliers.find((s) => s.id === this.supplierId) ?? null;
      },
    });

    // Load supplier products
    this.supplierSvc.getSuppliersByProduct(this.supplierId).subscribe({
      next:  (data) => { this.products = data.map(toProduct); this.loading = false; },
      error: ()     => { this.loading = false; },
    });
  }
}
