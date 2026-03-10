// Re-export API models
export * from './api.models';

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
