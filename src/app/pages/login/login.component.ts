import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';
  loading = false;
  userType: 'shop' | 'supplier' = 'shop';

  form = this.fb.nonNullable.group({
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  setUserType(type: 'shop' | 'supplier'): void {
    this.userType = type;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = '';
    this.loading = true;
    const { phone, password } = this.form.getRawValue();

    const loginObservable = this.userType === 'shop' 
      ? this.auth.loginShop({ phone, password })
      : this.auth.loginSupplier({ phone, password });

    console.log('[v0] Login attempt - userType:', this.userType, 'phone:', phone);
    
    loginObservable.subscribe({
      next: (res) => {
        console.log('[v0] Login success - response:', res);
        console.log('[v0] Token stored:', localStorage.getItem('tapsyrys_token'));
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('[v0] Login error:', err);
        this.error = err?.error?.message || 'Ошибка входа. Проверьте данные.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
