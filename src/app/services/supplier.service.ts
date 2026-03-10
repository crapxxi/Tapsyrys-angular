import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { SupplierResponse, ShopResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  // ==========================================
  // Suppliers
  // ==========================================

  /** GET /api/v1/suppliers */
  getAllSuppliers(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(this.apiConfig.suppliers.getAll);
  }

  /** GET /api/v1/suppliers/{id} */
  getSupplierById(id: number): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.apiConfig.suppliers.getById(id));
  }

  // ==========================================
  // Shops
  // ==========================================

  /** GET /api/v1/shops */
  getAllShops(): Observable<ShopResponse[]> {
    return this.http.get<ShopResponse[]>(this.apiConfig.shops.getAll);
  }

  /** GET /api/v1/shops/{id} */
  getShopById(id: number): Observable<ShopResponse> {
    return this.http.get<ShopResponse>(this.apiConfig.shops.getById(id));
  }
}
