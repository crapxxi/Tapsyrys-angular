// ==========================================
// API Request/Response Models
// Matching Java Backend OpenAPI Spec
// ==========================================

// ---------- Auth Requests ----------

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

// ---------- Entity Responses ----------

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

// ---------- Category (Frontend only) ----------

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

// Categories are hardcoded in frontend since API doesn't provide them
export const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Молочные продукты', icon: 'img/catalog/milkIcon.png' },
  { id: '2', name: 'Бакалея', icon: 'img/catalog/bakaleyaIcon.png' },
  { id: '3', name: 'Напитки', icon: 'img/catalog/drinkIcon.png' },
  { id: '4', name: 'Кондитерские изделия', icon: 'img/catalog/cakesIcon.png' },
  { id: '5', name: 'Овощи и фрукты', icon: 'img/catalog/VeggieIcon.png' },
  { id: '6', name: 'Мясо и птица', icon: 'img/catalog/meatIcon.png' },
];
