import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API = '/api/v1/product';

  constructor(private http: HttpClient) {}

  /** GET /api/v1/product/ — all products */
  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.API}/`);
  }

  /**
   * GET /api/v1/product/search
   * Query params: name (optional), category (optional)
   */
  search(name?: string, category?: string): Observable<ProductResponse[]> {
    let params = new HttpParams();
    if (name)     params = params.set('name', name);
    if (category) params = params.set('category', category);
    return this.http.get<ProductResponse[]>(`${this.API}/search`, { params });
  }

  /**
   * POST /api/v1/product/{productId}/favorite
   * Toggle favourite for a product
   */
  toggleFavorite(productId: number): Observable<unknown> {
    return this.http.post(`${this.API}/${productId}/favorite`, {});
  }

  /**
   * POST /api/v1/product/add  — upload / create a product (admin / supplier)
   */
  add(payload: { name: string; category: string }): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.API}/add`, payload);
  }
}
