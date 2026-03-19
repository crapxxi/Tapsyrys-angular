import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierProductResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private readonly API = '/api/v1/shop';

  constructor(private http: HttpClient) {}

  /** GET /api/v1/shop/favorites */
  getFavorites(): Observable<SupplierProductResponse[]> {
    return this.http.get<SupplierProductResponse[]>(`${this.API}/favorites`);
  }
}
