import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierResponse, SupplierProductResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly API         = '/api/v1/supplier';
  private readonly PRODUCT_API = '/api/v1/supplier/product';

  constructor(private http: HttpClient) {}

  // ── Supplier endpoints ────────────────────────────────────────────────────

  /** GET /api/v1/supplier/all */
  getAll(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(`${this.API}/all`);
  }

  /**
   * GET /api/v1/supplier/search
   * Query params: city (optional), category (optional)
   */
  search(city?: string, category?: string): Observable<SupplierResponse[]> {
    let params = new HttpParams();
    if (city)     params = params.set('city', city);
    if (category) params = params.set('category', category);
    return this.http.get<SupplierResponse[]>(`${this.API}/search`, { params });
  }

  // ── Supplier-product endpoints ────────────────────────────────────────────

  /** GET /api/v1/supplier/product/ — catalogue for the authenticated supplier */
  getCatalogue(): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(`${this.PRODUCT_API}/`);
  }

  /**
   * GET /api/v1/supplier/product/details
   * Query params: productId, supplierId
   */
  getProductDetails(productId: number, supplierId: number): Observable<SupplierProductResponse> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('supplierId', supplierId);
    return this.http.get<SupplierProductResponse>(`${this.PRODUCT_API}/details`, { params });
  }

  /**
   * GET /api/v1/supplier/product/suppliers
   * Returns suppliers for a given productId
   */
  getSuppliersByProduct(productId: number): Observable<SupplierProductResponse[]> {
    const params = new HttpParams().set('productId', productId);
    return this.http.get<SupplierProductResponse[]>(`${this.PRODUCT_API}/suppliers`, { params });
  }

  /**
   * POST /api/v1/supplier/product/add
   */
  addProduct(payload: {
    productId: number;
    supplierId: number;
    name: string;
    supplierName: string;
    count: number;
    price: number;
  }): Observable<SupplierProductResponse> {
    return this.http.post<SupplierProductResponse>(`${this.PRODUCT_API}/add`, payload);
  }
}
