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
  JwtResponse,
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

  loginShop(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiConfig.auth.shopLogin, credentials).pipe(
      tap((res) => this.handleJwtSuccess(res, 'shop', credentials.phone))
    );
  }

  signupShop(data: ShopSignupRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiConfig.auth.shopSignup, data).pipe(
      tap((res) => this.handleJwtSuccess(res, 'shop', data.phone, data.name))
    );
  }

  // ==========================================
  // Supplier Auth
  // ==========================================

  loginSupplier(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiConfig.auth.supplierLogin, credentials).pipe(
      tap((res) => this.handleJwtSuccess(res, 'supplier', credentials.phone))
    );
  }

  signupSupplier(data: SupplierSignupRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiConfig.auth.supplierSignup, data).pipe(
      tap((res) => this.handleJwtSuccess(res, 'supplier', data.phone, data.name))
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

  /**
   * Handle JWT response from backend.
   * Since backend only returns { token, type }, we create a minimal user object
   * from the login/signup data.
   */
  private handleJwtSuccess(
    res: JwtResponse, 
    userType: 'shop' | 'supplier', 
    phone: string,
    name?: string
  ): void {
    // Create minimal user from available data
    const user: User = {
      id: '', // Will be populated when we fetch user profile
      organizationName: name || '',
      role: userType === 'shop' ? 'Shop' : 'Supplier',
      iin: '',
      contactPerson: name || '',
      phone: phone,
      email: '',
    };
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.USER_TYPE_KEY, userType);
    }
    
    this.userSignal.set(user);
    this.userTypeSignal.set(userType);
  }

  /**
   * Fetch current user profile after login.
   * Call this if you need full user details.
   */
  fetchShopProfile(id: number): Observable<ShopResponse> {
    return this.http.get<ShopResponse>(this.apiConfig.shops.getById(id)).pipe(
      tap((shop) => {
        const user: User = {
          id: String(shop.id),
          organizationName: shop.name,
          role: 'Shop',
          iin: '',
          contactPerson: shop.name,
          phone: shop.phone,
          email: '',
        };
        this.userSignal.set(user);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
      })
    );
  }

  fetchSupplierProfile(id: number): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(this.apiConfig.suppliers.getById(id)).pipe(
      tap((supplier) => {
        const user: User = {
          id: String(supplier.id),
          organizationName: supplier.name,
          role: 'Supplier',
          iin: '',
          contactPerson: supplier.name,
          phone: supplier.phone,
          email: '',
        };
        this.userSignal.set(user);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
      })
    );
  }
}
