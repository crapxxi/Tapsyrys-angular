import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MOCK_PRODUCTS, MOCK_SUPPLIER } from '../../data/mock-data';
import { Product } from '../../models';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-supplier-catalog',
  standalone: true,
  imports: [ProductCardComponent, NgOptimizedImage],
  templateUrl: './supplier-catalog.component.html',
  styleUrl: './supplier-catalog.component.css',
})
export class SupplierCatalogComponent {
  private route = inject(ActivatedRoute);
  supplier = MOCK_SUPPLIER;
  products: Product[] = MOCK_PRODUCTS.filter((p) => p.supplier === MOCK_SUPPLIER.name);
  supplierId = '';

  constructor() {
    this.route.params.subscribe((params) => {
      this.supplierId = params['id'] || '1';
      this.products = MOCK_PRODUCTS.filter((p) => p.supplier === this.supplier.name);
    });
  }
}
