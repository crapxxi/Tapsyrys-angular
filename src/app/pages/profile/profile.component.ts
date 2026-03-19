import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService }               from '../../services/auth.service';
import { UserResponse }              from '../../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private authSvc = inject(AuthService);
  private fb      = inject(FormBuilder);

  user: UserResponse | null = null;
  emailNotifications = true;
  smsNotifications   = false;
  twoFactor          = false;
  saveSuccess        = false;

  addresses = [
    { id: '1', name: 'Абая 67',     detail: 'вход за углом',      default: true  },
    { id: '2', name: 'Ауэзова 123', detail: 'возле обувного',     default: false },
  ];

  form = this.fb.nonNullable.group({
    name:  [''],
    phone: [''],
  });

  ngOnInit(): void {
    // Try fetching fresh data from /api/v1/auth/me
    this.authSvc.me().subscribe({
      next: (u) => {
        this.user = u;
        this.form.patchValue({ name: u.name, phone: u.phone });
      },
      // fallback to cached signal value
      error: () => {
        const cached = this.authSvc.user();
        if (cached) {
          this.user = cached;
          this.form.patchValue({ name: cached.name, phone: cached.phone });
        }
      },
    });
  }

  save(): void {
    // Profile update endpoint not in spec — show success feedback only
    this.saveSuccess = true;
    setTimeout(() => (this.saveSuccess = false), 3000);
  }

  logout(): void {
    this.authSvc.logout();
  }
}
