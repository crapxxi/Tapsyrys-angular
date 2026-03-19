import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest, OrderResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly API = '/api/v1/orders';

  constructor(private http: HttpClient) {}

  /** POST /api/v1/orders/create */
  create(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.API}/create`, order);
  }

  /** GET /api/v1/orders/all */
  getAll(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.API}/all`);
  }
}
