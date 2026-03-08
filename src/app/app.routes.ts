import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { path: 'catalog', loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent) },
      { path: 'catalog/search', loadComponent: () => import('./pages/search-results/search-results.component').then(m => m.SearchResultsComponent) },
      { path: 'catalog/supplier/:id', loadComponent: () => import('./pages/supplier-catalog/supplier-catalog.component').then(m => m.SupplierCatalogComponent) },
      { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent) },
      { path: 'help', loadComponent: () => import('./pages/help/help.component').then(m => m.HelpComponent) },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) },
    ],
  },
  { path: '**', redirectTo: 'catalog' },
];
