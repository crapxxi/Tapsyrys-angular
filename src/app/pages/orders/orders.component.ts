import { Component, OnInit } from '@angular/core';
import { RouterLink }        from '@angular/router';
import { FormsModule }       from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OrderService }      from '../../services/order.service';
import { AuthService }       from '../../services/auth.service';
import { OrderResponse }     from '../../models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, DecimalPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  filteredOrders: OrderResponse[] = [];
  sortBy       = 'date';
  statusFilter = 'all';
  loading      = false;
  error        = '';

  constructor(
    public auth: AuthService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) return;
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders         = data;
        this.filteredOrders = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error   = err?.error?.message ?? 'Ошибка загрузки заказов';
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    let list = [...this.orders];

    if (this.statusFilter !== 'all') {
      list = list.filter((o) => o.status === this.statusFilter);
    }

    if (this.sortBy === 'date') {
      list.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (this.sortBy === 'amount') {
      list.sort((a, b) => (b.totalPrice ?? 0) - (a.totalPrice ?? 0));
    }

    this.filteredOrders = list;
  }

  onSortChange(): void  { this.applyFilters(); }
  onFilterChange(): void { this.applyFilters(); }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      in_progress: 'badge-warning',
      delivered:   'badge-success',
      cancelled:   'badge-error',
    };
    return map[status] ?? 'badge-warning';
  }

  getStatusText(status: string): string {
    const map: Record<string, string> = {
      in_progress: 'В обработке',
      delivered:   'Доставлен',
      cancelled:   'Отменен',
    };
    return map[status] ?? status;
  }

  formatDate(iso: string): string {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('ru-KZ');
    } catch {
      return iso;
    }
  }
}
