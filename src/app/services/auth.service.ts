import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import {
  AuthResponse,
  LoginRequest,
  ShopSignupRequest,
  SupplierSignupRequest,
  UserResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tapsyrys_token';
  private readonly USER_KEY  = 'tapsyrys_user';
  private readonly API = '/api/v1/auth';

  private userSignal = signal<UserResponse | null>(null);
  readonly user          = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userSignal.set(this.loadUser());
    }
  }

  // ── helpers ──────────────────────────────────────────────────────────────

  private loadUser(): UserResponse | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private persist(res: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    }
    this.userSignal.set(res.user);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ── auth endpoints ────────────────────────────────────────────────────────

  /** POST /api/v1/auth/login */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API}/login`, credentials)
      .pipe(tap((res) => this.persist(res)));
  }

  /** POST /api/v1/auth/register/shop */
  registerShop(data: ShopSignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API}/register/shop`, data)
      .pipe(tap((res) => this.persist(res)));
  }

  /** POST /api/v1/auth/register/supplier */
  registerSupplier(data: SupplierSignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API}/register/supplier`, data)
      .pipe(tap((res) => this.persist(res)));
  }

  /** GET /api/v1/auth/me */
  me(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API}/me`).pipe(
      tap((user) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
        this.userSignal.set(user);
      }),
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.userSignal.set(null);
    this.router.navigate(['/catalog']);
  }
}
