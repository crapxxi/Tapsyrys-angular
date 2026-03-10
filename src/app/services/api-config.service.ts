import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * API Configuration Service
 * Centralized configuration for all API endpoints.
 * 
 * To change the backend URL:
 * 1. Update src/environments/environment.ts for development
 * 2. Update src/environments/environment.prod.ts for production
 * 
 * Or override at runtime using setBaseUrl()
 */
@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  private _baseUrl: string = environment.apiBaseUrl;

  /** Get the current base URL */
  get baseUrl(): string {
    return this._baseUrl;
  }

  /** Override base URL at runtime */
  setBaseUrl(url: string): void {
    this._baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  }

  // ==========================================
  // Auth Endpoints
  // ==========================================
  
  get auth() {
    return {
      login: `${this._baseUrl}/auth/login`,
      shopSignup: `${this._baseUrl}/auth/shop/signup`,
      supplierSignup: `${this._baseUrl}/auth/supplier/signup`,
      logout: `${this._baseUrl}/auth/logout`,
    };
  }

  // ==========================================
  // Shop Endpoints
  // ==========================================

  get shops() {
    return {
      getAll: `${this._baseUrl}/shops`,
      getById: (id: number) => `${this._baseUrl}/shops/${id}`,
      update: (id: number) => `${this._baseUrl}/shops/${id}`,
      delete: (id: number) => `${this._baseUrl}/shops/${id}`,
    };
  }

  // ==========================================
  // Supplier Endpoints
  // ==========================================

  get suppliers() {
    return {
      getAll: `${this._baseUrl}/suppliers`,
      getById: (id: number) => `${this._baseUrl}/suppliers/${id}`,
      getByCategory: (category: string) => `${this._baseUrl}/suppliers/category/${category}`,
      update: (id: number) => `${this._baseUrl}/suppliers/${id}`,
      delete: (id: number) => `${this._baseUrl}/suppliers/${id}`,
    };
  }

  // ==========================================
  // Product Endpoints
  // ==========================================

  get products() {
    return {
      getAll: `${this._baseUrl}/products`,
      getById: (id: number) => `${this._baseUrl}/products/${id}`,
      getByCategory: (category: string) => `${this._baseUrl}/products/category/${category}`,
      search: (query: string) => `${this._baseUrl}/products/search?q=${encodeURIComponent(query)}`,
      create: `${this._baseUrl}/products`,
      update: (id: number) => `${this._baseUrl}/products/${id}`,
      delete: (id: number) => `${this._baseUrl}/products/${id}`,
    };
  }

  // ==========================================
  // Supplier Products Endpoints
  // ==========================================

  get supplierProducts() {
    return {
      getAll: `${this._baseUrl}/supplier-products`,
      getById: (id: number) => `${this._baseUrl}/supplier-products/${id}`,
      getBySupplier: (supplierId: number) => `${this._baseUrl}/supplier-products/supplier/${supplierId}`,
      getByProduct: (productId: number) => `${this._baseUrl}/supplier-products/product/${productId}`,
      search: (query: string) => `${this._baseUrl}/supplier-products/search?q=${encodeURIComponent(query)}`,
      create: `${this._baseUrl}/supplier-products`,
      update: (id: number) => `${this._baseUrl}/supplier-products/${id}`,
      delete: (id: number) => `${this._baseUrl}/supplier-products/${id}`,
    };
  }

  // ==========================================
  // Orders Endpoints
  // ==========================================

  get orders() {
    return {
      getAll: `${this._baseUrl}/orders`,
      getById: (id: number) => `${this._baseUrl}/orders/${id}`,
      getByShop: (shopId: number) => `${this._baseUrl}/orders/shop/${shopId}`,
      getBySupplier: (supplierId: number) => `${this._baseUrl}/orders/supplier/${supplierId}`,
      create: `${this._baseUrl}/orders`,
      updateStatus: (id: number) => `${this._baseUrl}/orders/${id}/status`,
      cancel: (id: number) => `${this._baseUrl}/orders/${id}/cancel`,
    };
  }
}
