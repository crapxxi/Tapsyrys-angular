// ==========================================
// API Request/Response Models
// Matching Java Backend DTOs
// ==========================================

// ---------- Auth ----------

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface ShopSignupRequest {
  name: string;
  location: string;
  phone: string;
  password: string;
}

export interface SupplierSignupRequest {
  name: string;
  category: string;
  phone: string;
  password: string;
  logoUrl: string;
}

// ---------- Responses ----------

export interface ShopResponse {
  id: number;
  name: string;
  location: string;
  phone: string;
}

export interface SupplierResponse {
  id: number;
  name: string;
  phone: string;
  category: string;
  logoUrl: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  category: string;
}

export interface SupplierProductResponse {
  id: number;
  productId: number;
  supplierId: number;
  name: string;
  supplierName: string;
  count: number;
  price: number;
}

// ---------- Auth Response ----------

export interface AuthResponse {
  token: string;
  user: ShopResponse | SupplierResponse;
  userType: 'shop' | 'supplier';
}
