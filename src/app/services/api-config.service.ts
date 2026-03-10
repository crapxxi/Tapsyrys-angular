import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * API Configuration Service
 * Centralized configuration for all API endpoints.
 * 
 * Base URL: http://localhost:8080/api/v1
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
      // POST /api/v1/auth/shop/login
      shopLogin: `${this._baseUrl}/auth/shop/login`,
      // POST /api/v1/auth/supplier/login
      supplierLogin: `${this._baseUrl}/auth/supplier/login`,
      // POST /api/v1/auth/shop/signup
      shopSignup: `${this._baseUrl}/auth/shop/signup`,
      // POST /api/v1/auth/supplier/signup
      supplierSignup: `${this._baseUrl}/auth/supplier/signup`,
    };
  }

  // ==========================================
  // Shop Endpoints
  // ==========================================

  get shops() {
    return {
      // GET /api/v1/shops
      getAll: `${this._baseUrl}/shops`,
      // GET /api/v1/shops/{id}
      getById: (id: number) => `${this._baseUrl}/shops/${id}`,
    };
  }

  // ==========================================
  // Supplier Endpoints
  // ==========================================

  get suppliers() {
    return {
      // GET /api/v1/suppliers
      getAll: `${this._baseUrl}/suppliers`,
      // GET /api/v1/suppliers/{id}
      getById: (id: number) => `${this._baseUrl}/suppliers/${id}`,
    };
  }

  // ==========================================
  // Product Endpoints
  // ==========================================

  get products() {
    return {
      // GET /api/v1/products
      getAll: `${this._baseUrl}/products`,
      // GET /api/v1/products/{id}
      getById: (id: number) => `${this._baseUrl}/products/${id}`,
      // POST /api/v1/products/add
      add: `${this._baseUrl}/products/add`,
    };
  }

  // ==========================================
  // Supplier Products Endpoints
  // ==========================================

  get supplierProducts() {
    return {
      // GET /api/v1/supplier/products
      getAll: `${this._baseUrl}/supplier/products`,
      // GET /api/v1/supplier/products/{id}
      getById: (id: number) => `${this._baseUrl}/supplier/products/${id}`,
      // POST /api/v1/supplier/products/add
      add: `${this._baseUrl}/supplier/products/add`,
    };
  }
}
