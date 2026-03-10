import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { ProductResponse, SupplierProductResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  // ==========================================
  // Products (Base Products)
  // ==========================================

  /** GET /api/v1/products */
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiConfig.products.getAll);
  }

  /** GET /api/v1/products/{id} */
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiConfig.products.getById(id));
  }

  /** POST /api/v1/products/add */
  addProduct(product: ProductResponse): Observable<object> {
    return this.http.post<object>(this.apiConfig.products.add, product);
  }

  // ==========================================
  // Supplier Products (Products with price/stock)
  // ==========================================

  /** GET /api/v1/supplier/products */
  getAllSupplierProducts(): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(this.apiConfig.supplierProducts.getAll);
  }

  /** GET /api/v1/supplier/products/{id} */
  getSupplierProductById(id: number): Observable<SupplierProductResponse> {
    return this.http.get<SupplierProductResponse>(this.apiConfig.supplierProducts.getById(id));
  }

  /** POST /api/v1/supplier/products/add */
  addSupplierProduct(product: SupplierProductResponse): Observable<object> {
    return this.http.post<object>(this.apiConfig.supplierProducts.add, product);
  }
}
