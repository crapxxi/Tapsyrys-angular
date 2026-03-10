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
  // Products
  // ==========================================

  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiConfig.products.getAll);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiConfig.products.getById(id));
  }

  getProductsByCategory(category: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiConfig.products.getByCategory(category));
  }

  searchProducts(query: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiConfig.products.search(query));
  }

  createProduct(product: Partial<ProductResponse>): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiConfig.products.create, product);
  }

  updateProduct(id: number, product: Partial<ProductResponse>): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(this.apiConfig.products.update(id), product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.apiConfig.products.delete(id));
  }

  // ==========================================
  // Supplier Products (Products with price/stock)
  // ==========================================

  getAllSupplierProducts(): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(this.apiConfig.supplierProducts.getAll);
  }

  getSupplierProductById(id: number): Observable<SupplierProductResponse> {
    return this.http.get<SupplierProductResponse>(this.apiConfig.supplierProducts.getById(id));
  }

  getSupplierProductsBySupplier(supplierId: number): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(this.apiConfig.supplierProducts.getBySupplier(supplierId));
  }

  getSupplierProductsByProduct(productId: number): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(this.apiConfig.supplierProducts.getByProduct(productId));
  }

  searchSupplierProducts(query: string): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(this.apiConfig.supplierProducts.search(query));
  }

  createSupplierProduct(product: Partial<SupplierProductResponse>): Observable<SupplierProductResponse> {
    return this.http.post<SupplierProductResponse>(this.apiConfig.supplierProducts.create, product);
  }

  updateSupplierProduct(id: number, product: Partial<SupplierProductResponse>): Observable<SupplierProductResponse> {
    return this.http.put<SupplierProductResponse>(this.apiConfig.supplierProducts.update(id), product);
  }

  deleteSupplierProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.apiConfig.supplierProducts.delete(id));
  }
}
