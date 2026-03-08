import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MOCK_ORDERS } from '../../data/mock-data';
import { Order } from '../../models';
import {AuthService} from '../../services/auth.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Order[] = MOCK_ORDERS;
  sortBy = 'date';
  statusFilter = 'in_progress';

  constructor(
    public auth: AuthService,
    public cart: CartService
  ) {}


  get statusLabel(): string {
    const labels: Record<string, string> = {
      in_progress: 'В обработке',
      delivered: 'Доставлен',
      cancelled: 'Отменен',
    };
    return labels[this.statusFilter] || 'Все';
  }

  getStatusClass(status: Order['status']): string {
    return status === 'in_progress' ? 'badge-warning' : status === 'delivered' ? 'badge-success' : 'badge-error';
  }

  getStatusText(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
      in_progress: 'В обработке',
      delivered: 'Доставлен',
      cancelled: 'Отменен',
    };
    return labels[status];
  }
}
