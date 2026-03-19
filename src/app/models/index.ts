// ─── Domain models (frontend) ────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  supplier: string;
  price: number;
  unit: string;
  inStock: boolean;
  imageUrl?: string;
  category?: string;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  description: string;
  logoUrl?: string;
  phone: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'in_progress' | 'delivered' | 'cancelled';
  amount: number;
  supplier: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface User {
  id: string;
  organizationName: string;
  role: string;
  iin: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// ─── Backend API DTOs ─────────────────────────────────────────────────────────

/** POST /api/v1/auth/login */
export interface LoginRequest {
  phone: string;
  password: string;
}

/** POST /api/v1/auth/register/shop */
export interface ShopSignupRequest {
  name: string;
  location: string;
  phone: string;
  password: string;
}

/** POST /api/v1/auth/register/supplier */
export interface SupplierSignupRequest {
  name: string;
  logoUrl: string;
  category: string;
  city: string;
  phone: string;
  password: string;
}

/** GET /api/v1/auth/me  (and login/register response) */
export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  name: string;
  phone: string;
  role: 'SHOP' | 'SUPPLIER';
}

/** GET /api/v1/product/ & search */
export interface ProductResponse {
  id: number;
  name: string;
  category: string;
}

/** GET /api/v1/supplier/product/ */
export interface SupplierProductResponse {
  id: number;
  productId: number;
  supplierId: number;
  name: string;
  supplierName: string;
  count: number;
  price: number;
}

/** GET /api/v1/supplier/all & search */
export interface SupplierResponse {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  city: string;
}

/** POST /api/v1/orders/create */
export interface OrderItemsRequest {
  supplierId: number;
  productId: number;
  count: number;
}

export interface OrderRequest {
  orderItems: OrderItemsRequest[];
}

/** GET /api/v1/orders/all */
export interface OrderResponse {
  id: number;
  status: string;
  createdAt: string;
  totalPrice?: number;
  supplierName?: string;
  items?: OrderItemsRequest[];
}
