import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);

  user = this.auth.user();
  emailNotifications = true;
  smsNotifications = false;
  twoFactor = false;

  addresses = [
    { id: '1', name: 'Абая 67', detail: 'вход за углом, ...', default: true },
    { id: '2', name: 'Ауэзова 123', detail: 'возле обувном ....', default: false },
  ];

  form = this.fb.nonNullable.group({
    organizationName: [this.user?.organizationName ?? ''],
    iin: [this.user?.iin ?? ''],
    contactPerson: [this.user?.contactPerson ?? ''],
    phone: [this.user?.phone ?? ''],
    email: [this.user?.email ?? ''],
  });

  save(): void {
    console.log('Save profile', this.form.getRawValue());
  }

  logout(): void {
    this.auth.logout();
  }
}
