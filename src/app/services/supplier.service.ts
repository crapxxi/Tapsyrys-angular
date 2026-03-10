import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { SupplierResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getAllSuppliers(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(this.apiConfig.suppliers.getAll);
  }

  getSupplierById(id: number): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.apiConfig.suppliers.getById(id));
  }

  getSuppliersByCategory(category: string): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(this.apiConfig.suppliers.getByCategory(category));
  }

  updateSupplier(id: number, supplier: Partial<SupplierResponse>): Observable<SupplierResponse> {
    return this.http.put<SupplierResponse>(this.apiConfig.suppliers.update(id), supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(this.apiConfig.suppliers.delete(id));
  }
}
