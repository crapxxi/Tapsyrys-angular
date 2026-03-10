import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models';
import { ApiConfigService } from './api-config.service';
import {
  LoginRequest,
  ShopSignupRequest,
  SupplierSignupRequest,
  ShopResponse,
  SupplierResponse,
  AuthResponse,
} from '../models/api.models';

// Re-export for backwards compatibility
export type { LoginRequest, ShopSignupRequest, SupplierSignupRequest };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tapsyrys_token';
  private readonly USER_KEY = 'tapsyrys_user';
  private readonly USER_TYPE_KEY = 'tapsyrys_user_type';

  private userSignal = signal<User | null>(null);
  private userTypeSignal = signal<'shop' | 'supplier' | null>(null);
  
  readonly user = this.userSignal.asReadonly();
  readonly userType = this.userTypeSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());
  readonly isShop = computed(() => this.userTypeSignal() === 'shop');
  readonly isSupplier = computed(() => this.userTypeSignal() === 'supplier');

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStoredAuth();
    }
  }

  private loadStoredAuth(): void {
    if (typeof localStorage === 'undefined') return;
    
    const storedUser = localStorage.getItem(this.USER_KEY);
    const storedType = localStorage.getItem(this.USER_TYPE_KEY) as 'shop' | 'supplier' | null;
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    
    if (storedUser && storedToken) {
      this.userSignal.set(JSON.parse(storedUser));
      this.userTypeSignal.set(storedType);
    }
  }

  /** Get stored auth token */
  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ==========================================
  // Shop Auth
  // ==========================================

  loginShop(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.shopLogin, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res, 'shop'))
    );
  }

  signupShop(data: ShopSignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.shopSignup, data).pipe(
      tap((res) => this.handleAuthSuccess(res, 'shop'))
    );
  }

  // ==========================================
  // Supplier Auth
  // ==========================================

  loginSupplier(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.supplierLogin, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res, 'supplier'))
    );
  }

  signupSupplier(data: SupplierSignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.supplierSignup, data).pipe(
      tap((res) => this.handleAuthSuccess(res, 'supplier'))
    );
  }

  // ==========================================
  // Common
  // ==========================================

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.USER_TYPE_KEY);
    }
    this.userSignal.set(null);
    this.userTypeSignal.set(null);
    this.router.navigate(['/']);
  }

  private handleAuthSuccess(res: AuthResponse, type: 'shop' | 'supplier'): void {
    const user = this.mapToUser(res.user, type);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.USER_TYPE_KEY, type);
    }
    
    this.userSignal.set(user);
    this.userTypeSignal.set(type);
  }

  private mapToUser(response: ShopResponse | SupplierResponse, type: 'shop' | 'supplier'): User {
    if (type === 'shop') {
      const shop = response as ShopResponse;
      return {
        id: String(shop.id),
        organizationName: shop.name,
        role: 'Shop',
        iin: '',
        contactPerson: shop.name,
        phone: shop.phone,
        email: '',
      };
    } else {
      const supplier = response as SupplierResponse;
      return {
        id: String(supplier.id),
        organizationName: supplier.name,
        role: 'Supplier',
        iin: '',
        contactPerson: supplier.name,
        phone: supplier.phone,
        email: '',
      };
    }
  }
}
