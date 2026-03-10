import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
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
export { LoginRequest, ShopSignupRequest, SupplierSignupRequest };

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
    
    if (storedUser) {
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
  // API Auth Methods
  // ==========================================

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.login, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  signupShop(data: ShopSignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.shopSignup, data).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  signupSupplier(data: SupplierSignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.auth.supplierSignup, data).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

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

  private handleAuthSuccess(res: AuthResponse): void {
    const user = this.mapToUser(res.user, res.userType);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.USER_TYPE_KEY, res.userType);
    }
    
    this.userSignal.set(user);
    this.userTypeSignal.set(res.userType);
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

  // ==========================================
  // Demo Methods (for testing without backend)
  // ==========================================

  /** For demo: login without API */
  loginDemo(credentials: LoginRequest): Observable<boolean> {
    const mockUser: User = {
      id: '1',
      organizationName: "ТОО 'Магазин у Абая'",
      role: 'Shop',
      iin: '123456789012',
      contactPerson: 'Иван Иванов',
      phone: credentials.phone,
      email: '',
    };
    const mockToken = 'demo-token-' + Date.now();
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(this.USER_TYPE_KEY, 'shop');
    }
    
    this.userSignal.set(mockUser);
    this.userTypeSignal.set('shop');
    return of(true);
  }

  /** For demo: shop signup without API */
  signupShopDemo(data: ShopSignupRequest): Observable<boolean> {
    const mockUser: User = {
      id: '1',
      organizationName: data.name,
      role: 'Shop',
      iin: '',
      contactPerson: data.name,
      phone: data.phone,
      email: '',
    };
    const mockToken = 'demo-token-' + Date.now();
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(this.USER_TYPE_KEY, 'shop');
    }
    
    this.userSignal.set(mockUser);
    this.userTypeSignal.set('shop');
    return of(true);
  }

  /** For demo: supplier signup without API */
  signupSupplierDemo(data: SupplierSignupRequest): Observable<boolean> {
    const mockUser: User = {
      id: '1',
      organizationName: data.name,
      role: 'Supplier',
      iin: '',
      contactPerson: data.name,
      phone: data.phone,
      email: '',
    };
    const mockToken = 'demo-token-' + Date.now();
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(this.USER_TYPE_KEY, 'supplier');
    }
    
    this.userSignal.set(mockUser);
    this.userTypeSignal.set('supplier');
    return of(true);
  }
}
