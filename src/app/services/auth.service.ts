import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { User } from '../models';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  organizationName: string;
  iin: string;
  contactPerson: string;
  phone: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tapsyrys_token';
  private readonly USER_KEY = 'tapsyrys_user';

  private userSignal = signal<User | null>(null);
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userSignal.set(this.loadUser());
    }
  }

  private loadUser(): User | null {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  /** Replace with your API endpoint */
  private get apiUrl(): string {
    return '/api'; // Configure your API base URL
  }

  login(credentials: LoginRequest): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  signup(data: SignupRequest): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/auth/signup`, data).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.userSignal.set(null);
    this.router.navigate(['/']);
  }

  private handleAuthSuccess(res: { user: User; token: string }): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    }
    this.userSignal.set(res.user);
  }

  /** For demo: login without API (replace with real API call) */
  loginDemo(credentials: LoginRequest): Observable<boolean> {
    const mockUser: User = {
      id: '1',
      organizationName: "ТОО 'Магазин у Абая'",
      role: 'Менеджер по закупкам',
      iin: '123456789012',
      contactPerson: 'Иван Иванов',
      phone: '+7 (777) 123-45-67',
      email: credentials.email,
    };
    const mockToken = 'demo-token-' + Date.now();
    this.handleAuthSuccess({ user: mockUser, token: mockToken });
    return of(true);
  }

  /** For demo: signup without API (replace with real API call) */
  signupDemo(data: SignupRequest): Observable<boolean> {
    const mockUser: User = {
      id: '1',
      organizationName: data.organizationName,
      role: 'Менеджер по закупкам',
      iin: data.iin,
      contactPerson: data.contactPerson,
      phone: data.phone,
      email: data.email,
    };
    const mockToken = 'demo-token-' + Date.now();
    this.handleAuthSuccess({ user: mockUser, token: mockToken });
    return of(true);
  }
}
