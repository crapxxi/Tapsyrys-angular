import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';
  loading = false;

  userType: 'shop' | 'supplier' = 'shop';

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    location: [''], // For shop
    category: [''], // For supplier
    logoUrl: [''], // For supplier
    phone: ['', Validators.required],
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
    const data = this.form.getRawValue();

    // Use demo methods for testing, switch to signupShop()/signupSupplier() for real API
    if (this.userType === 'shop') {
      this.auth.signupShopDemo({
        name: data.name,
        location: data.location,
        phone: data.phone,
        password: data.password,
      }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.error = err?.error?.message || 'Ошибка регистрации. Попробуйте снова.';
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    } else {
      this.auth.signupSupplierDemo({
        name: data.name,
        category: data.category,
        phone: data.phone,
        password: data.password,
        logoUrl: data.logoUrl,
      }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.error = err?.error?.message || 'Ошибка регистрации. Попробуйте снова.';
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    }
  }
}
